<template>
  <div>
    <template v-if="menus && menus.component">
      <el-menu-item :index="menus.path">
        <i :class="'el-icon-' + menus.icon"></i>
        <span slot="title">{{ menus.label }}</span>
      </el-menu-item>
    </template>
    <template
      v-if="menus && !menus.path && menus.children && menus.children.length > 0"
    >
      <el-submenu :index="menus.path">
        <template slot="title">
          <i :class="'el-icon-' + menus.icon"></i>
          <span>{{ menus.label }}</span>
        </template>
        <ItemTree
          v-for="childItem in menus.children"
          :key="childItem.id"
          :menus="childItem"
        >
          {{ childItem }}
        </ItemTree>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ItemTree',
  props: {
    menus: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="scss"></style>
