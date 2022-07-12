<template>
  <div>
    <el-menu
      :default-active="$route.path"
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <ItemTree
        v-for="item in menuList"
        :key="item.id"
        :menus="item"
      ></ItemTree>
    </el-menu>
  </div>
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
