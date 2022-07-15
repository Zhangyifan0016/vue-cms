<template>
  <el-menu
    :default-active="$route.path"
    background-color="#222d32"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
    :collapse-transition="false"
  >
    <ItemTree v-for="item in menuList" :key="item.id" :menus="item"></ItemTree>
  </el-menu>
</template>
<script>
import ItemTree from './ItemTree'

export default {
  name: 'menuTree',
  data() {
    return {}
  },
  components: {
    ItemTree
  },
  methods: {},
  computed: {
    menuList() {
      return this.$store.getters.menuList
    },
    isCollapse() {
      return this.$store.getters.isCollapse
    }
  }
}
</script>
<style scoped lang="scss">
.el-menu {
  border-right: none;
  // background-color: $aside-bg-color;
}
</style>
