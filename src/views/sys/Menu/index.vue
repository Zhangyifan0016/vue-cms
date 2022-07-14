<template>
  <div>
    <div class="menuHeader">
      <!-- form表单 -->
      <el-form :model="menusForm" :inline="true" ref="form">
        <el-form-item label="菜单" prop="role">
          <el-input
            placeholder="请输入菜单"
            clearable
            v-model="menusForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="success" @click="handleSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-edit" @click="handleOpenDialog"
        >新增</el-button
      >
    </div>

    <!-- table表格 -->
    <el-table
      :data="menusList"
      row-key="id"
      border
      stripe
      style="width: 100%"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column label="序号" prop="id" align="center" width="80">
      </el-table-column>
      <el-table-column prop="label" label="展示名称" align="center">
      </el-table-column>
      <el-table-column prop="name" label="文件名称" align="center">
      </el-table-column>
      <el-table-column prop="path" label="路径" align="center">
      </el-table-column>
      <el-table-column prop="component" label="前端component" align="center">
      </el-table-column>
      <el-table-column prop="perms" label="唯一标识" align="center">
      </el-table-column>
      <el-table-column prop="icon" label="图标" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.type === 2">按钮</el-tag>
          <el-tag v-if="scope.row.type === 1">菜单</el-tag>
          <el-tag type="success" v-if="scope.row.type === 0">目录</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            plain
            @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="menusForm.current"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="menusForm.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :show-close="false"
    >
      <el-form :model="diaLogForm" ref="dialogForm" label-width="100px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="diaLogForm.type" placeholder="请选择类型">
            <el-option label="目录" :value="0"></el-option>
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按钮" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级菜单" prop="fathMenu">
          <el-select v-model="diaLogForm.fathMenu" placeholder="请选择父级菜单">
            <el-option label="一级菜单" value="menu"></el-option>
            <el-option label="控制台" value="console"></el-option>
            <el-option label="系统管理" value="system"></el-option>
            <el-option label="|- 角色管理" value="role"></el-option>
            <el-option label="|- 菜单管理" value="menu"></el-option>
            <el-option label="|- 用户管理" value="user"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展示名称" prop="label">
          <el-input
            v-model="diaLogForm.label"
            placeholder="请输入展示名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="文件名称" prop="name">
          <el-input
            v-model="diaLogForm.name"
            placeholder="请输入文件名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input
            v-model="diaLogForm.icon"
            placeholder="请输入图标"
          ></el-input>
        </el-form-item>
        <el-form-item label="component" prop="component">
          <el-input
            v-model="diaLogForm.component"
            placeholder="请输入component"
          ></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input
            v-model="diaLogForm.path"
            placeholder="请输入component"
          ></el-input>
        </el-form-item>
        <el-form-item label="唯一标识" prop="perms">
          <el-input
            v-model="diaLogForm.perms"
            placeholder="请输入唯一标识"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="diaLogForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="success" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MenusApi from '../../../api/menus'

export default {
  name: 'index',
  data() {
    return {
      menusForm: {
        current: 1,
        size: 10,
        name: ''
      },
      menusList: [],
      dialogVisible: false,
      dialogTitle: '',
      diaLogForm: {
        type: 0,
        label: '',
        name: '',
        // id: 0,
        status: 1,
        perms: '',
        path: '',
        icon: '',
        component: '',
        fathMenu: ''
      },
      total: 0
    }
  },
  created() {
    this.loadMenusList()
  },
  methods: {
    async loadMenusList() {
      const menusList = await MenusApi.getMenusList(this.menusForm)
      this.menusList = menusList
    },
    handleSearch() {
      this.menusForm.current = 1
      this.loadMenusList()
    },
    handleSizeChange(size) {
      this.menusForm.size = size
      this.loadMenusList()
    },
    handleCurrentChange(current) {
      this.menusForm.current = current
      this.loadMenusList()
    },
    handleOpenDialog(id) {
      this.dialogTitle = typeof id === 'number' ? '编辑菜单' : '添加菜单'
      if (id && typeof id === 'number') this.handleFindMenu(id)
      this.dialogVisible = true
    },
    async handleFindMenu(id) {
      const res = await MenusApi.findOneMenus(id)
      this.diaLogForm = res
    },
    async handleConfirm() {
      if (this.diaLogForm.id) {
        await MenusApi.saveEdit(this.diaLogForm, this.diaLogForm.id)
        this.$notify({ title: '提示', message: '更新成功', type: 'success' })
        // this.diaLogForm.id = 0
      }
      if (this.dialogTitle === '添加菜单') {
        await MenusApi.addMenus(this.diaLogForm)
        this.$notify({ title: '提示', message: '添加成功', type: 'success' })
      }
      this.$refs.dialogForm.resetFields()
      this.dialogVisible = false
      console.log(this.diaLogForm)
      this.loadMenusList()
    },
    closeDialog() {
      this.$refs.dialogForm.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped lang="scss">
.menuHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
