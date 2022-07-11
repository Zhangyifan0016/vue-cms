<template>
  <el-menu
    default-active="2"
    background-color="#222d32"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
    </el-submenu>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
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
.el-menu {
  border-right: none;
  // background-color: $aside-bg-color;
}
</style>
