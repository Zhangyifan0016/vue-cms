<template>
  <div>
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
    <!-- table表格 -->
    <el-table :data="ruleList" border stripe style="width: 100%">
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
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="warning" size="mini" plain>分配权限</el-button>
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
      ruleList: []
    }
  },
  methods: {
    async loadRoleList() {
      const roleList = await RoleApi.getRoleList(this.roleForm)
      this.ruleList = roleList.records
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
    }
  },
  created() {
    this.loadRoleList()
  }
}
</script>
<style scoped lang="scss"></style>
