<template>
  <div>
    <!-- form表单 -->
    <el-form :model="userForm" :inline="true" ref="form">
      <el-form-item label="用户名" prop="role">
        <el-input
          placeholder="请输入用户名"
          clearable
          v-model="userForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="success" @click="handleSearch"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
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
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="warning" size="mini" plain>分配角色</el-button>
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
  </div>
</template>
<script>
import UsersApi from '../../../api/users'

export default {
  name: 'index',
  data() {
    return {
      total: 0,
      userForm: {
        current: 1,
        size: 10,
        name: ''
      },
      userList: []
    }
  },
  methods: {
    async loadUsersList() {
      const userList = await UsersApi.getUserList(this.userForm)
      this.userList = userList.records
      this.total = userList.total
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
    }
  },
  created() {
    this.loadUsersList()
  }
}
</script>
<style scoped lang="scss"></style>
