<template>
  <div>
    <div class="userHeader">
      <!-- form表单 -->
      <el-form :model="userForm" :inline="true" ref="form">
        <el-form-item label="用户名" prop="role">
          <el-input
            placeholder="请输入用户名"
            clearable
            v-model="userForm.username"
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
    <el-table :data="userList" border stripe style="width: 100%">
      <el-table-column label="序号" type="index" width="60"> </el-table-column>
      <el-table-column prop="username" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="avatar" label="头像" align="center">
        <template slot-scope="scope">
          <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="角色" align="center">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.roles" :key="index">{{
            item.name
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center">
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
            >分配角色</el-button
          >
          <el-button type="danger" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userForm.current"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="userForm.size"
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
        <el-form-item label="头像" prop="avatar">
          <el-avatar :size="60" :src="diaLogForm.avatar"></el-avatar>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="diaLogForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="diaLogForm.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="diaLogForm.email" autocomplete="off"></el-input>
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

    <!-- 分配角色 -->
    <el-dialog
      width="30%"
      center
      :show-close="false"
      title="分配角色"
      :visible.sync="roleDialogFormVisible"
    >
      <el-form
        :model="roleForm"
        :rules="roleRules"
        ref="roleDialogForm"
        label-width="60px"
      >
        <el-form-item label="角色" prop="roleId">
          <el-select
            style="width: 100%"
            multiple
            v-model="roleForm.roleId"
            placeholder="请选择角色"
          >
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UsersApi from '../../../api/users'
import RoleApi from '../../../api/role'

export default {
  name: 'index',
  data() {
    return {
      total: 0,
      dialogFormVisible: false,
      roleDialogFormVisible: false,
      roleId: '',
      roleForm: {
        roleId: []
      },
      roleRules: {
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      title: '',
      userForm: {
        current: 1,
        size: 10,
        username: ''
      },
      RoleForm: {
        current: 1,
        size: 10,
        name: ''
      },
      userList: [],
      roleList: [],
      diaLogForm: {
        username: '',
        password: '',
        email: '',
        status: 1,
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
      }
    }
  },
  methods: {
    async loadUsersList() {
      const userList = await UsersApi.getUserList(this.userForm)
      this.userList = userList.records
      this.total = userList.total
    },
    // 获取角色列表
    async loadRoleList() {
      const roleList = await RoleApi.getRoleList(this.RoleForm)
      this.roleList = roleList.records
    },
    handleSearch() {
      this.userForm.current = 1
      this.loadUsersList()
    },
    handleSizeChange(size) {
      this.userForm.size = size
      this.loadUsersList()
    },
    handleCurrentChange(current) {
      this.userForm.current = current
      this.loadUsersList()
    },
    handleOpenDialog(id) {
      this.title = typeof id === 'number' ? '编辑用户' : '添加用户'
      if (id && typeof id === 'number') this.handleFindUser(id)
      this.dialogFormVisible = true
    },
    async handleConfirm() {
      if (this.diaLogForm.id) {
        await UsersApi.saveEdit(this.diaLogForm, this.diaLogForm.id)
      } else if (this.title === '添加用户') {
        await UsersApi.addUser(this.diaLogForm)
      }
      this.$refs.dialogForm.resetFields()
      this.dialogFormVisible = false
      this.loadUsersList()
    },
    async handleFindUser(id) {
      const res = await UsersApi.findOneUser(id)
      this.diaLogForm = res
    },
    closeDialog() {
      this.$refs.dialogForm.resetFields()
      this.dialogFormVisible = false
    },
    handleOpenRoleDialog(row) {
      this.roleForm.roleId = []
      this.roleDialogFormVisible = true
      row.roles.forEach((item) => {
        this.roleForm.roleId.push(item.id)
      })
      this.roleId = row.id
      console.log(this.roleForm.roleId)
    },
    handleSubmitRole() {
      this.$refs.roleDialogForm.validate(async (valid) => {
        if (valid) {
          const response = await RoleApi.updateRole(
            this.roleId,
            this.roleForm.roleId
          )
          console.log(response)
          this.roleDialogFormVisible = false
          this.$notify({ title: '提示', message: '更新成功', type: 'success' })
          this.loadUsersList()
        }
      })
    }
  },
  created() {
    this.loadUsersList()
    this.loadRoleList()
  }
}
</script>
<style scoped lang="scss">
.userHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
