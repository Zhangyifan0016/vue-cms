<template>
  <div>
    <div class="roleHeader">
      <!-- form表单 -->
      <el-form :model="roleForm" :inline="true" ref="form">
        <el-form-item label="角色" prop="role">
          <el-input
            placeholder="请输入角色"
            clearable
            v-model="roleForm.name"
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
    <el-table :data="roleList" border stripe style="width: 100%">
      <el-table-column label="序号" type="index" width="60"> </el-table-column>
      <el-table-column prop="name" label="角色" align="center">
      </el-table-column>
      <el-table-column prop="code" label="编码" align="center">
      </el-table-column>
      <el-table-column prop="remark" label="描述" align="center">
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

      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            plain
            @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="warning"
            size="mini"
            @click="handleOpenRoleDialog(scope.row)"
            plain
            >分配权限</el-button
          >
          <el-button type="danger" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="roleForm.current"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="roleForm.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 模态框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      :show-close="false"
    >
      <el-form
        ref="dialogForm"
        class="dialogForm"
        :model="diaLogForm"
        label-width="60px"
      >
        <el-form-item label="角色" prop="name">
          <el-input v-model="diaLogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="diaLogForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input
            type="textarea"
            v-model="diaLogForm.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="diaLogForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import RoleApi from '../../../api/role'

export default {
  name: 'index',
  data() {
    return {
      total: 0,
      roleForm: {
        current: 1,
        size: 10,
        name: ''
      },
      roleList: [],
      title: '',
      dialogFormVisible: false,
      diaLogForm: {
        name: '',
        code: '',
        remark: '',
        status: 1,
        id: 0
      }
    }
  },
  methods: {
    async loadRoleList() {
      const roleList = await RoleApi.getRoleList(this.roleForm)
      this.roleList = roleList.records
      this.total = roleList.total
    },
    handleSearch() {
      this.roleForm.current = 1
      this.loadRoleList()
    },
    handleSizeChange(size) {
      this.roleForm.size = size
      this.loadRoleList()
    },
    handleCurrentChange(current) {
      this.roleForm.current = current
      this.loadRoleList()
    },
    closeDialog() {
      this.$refs.dialogForm.resetFields()
      this.dialogFormVisible = false
    },
    handleOpenDialog(id) {
      this.title = typeof id === 'number' ? '编辑角色' : '添加角色'
      if (id && typeof id === 'number') this.handleFindRole(id)
      this.dialogFormVisible = true
    },
    async handleFindRole(id) {
      const res = await RoleApi.findOneRole(id)
      this.diaLogForm = res
    },
    async handleConfirm() {
      if (this.diaLogForm.id) {
        await RoleApi.saveEdit(this.diaLogForm, this.diaLogForm.id)
        this.$notify({ title: '提示', message: '更新成功', type: 'success' })
        this.diaLogForm.id = 0
      }
      if (this.title === '添加角色') {
        await RoleApi.addRole(this.diaLogForm)
        this.$notify({ title: '提示', message: '添加成功', type: 'success' })
      }
      this.$refs.dialogForm.resetFields()
      this.dialogFormVisible = false
      console.log(this.diaLogForm)
      this.loadRoleList()
    },
    handleOpenRoleDialog() {}
  },
  created() {
    this.loadRoleList()
  }
}
</script>
<style scoped lang="scss">
.roleHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
