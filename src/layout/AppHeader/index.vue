<template>
  <div class="header">
    <div class="letf">123</div>
    <div class="right">
      <el-avatar :size="40" :src="circleUrl"></el-avatar>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personSetting">个人设置</el-dropdown-item>
          <el-dropdown-item command="logout">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  .left {
    float: left;
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    float: right;
    align-items: center;
  }
}
</style>
