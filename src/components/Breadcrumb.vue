<template>
  <div class="main">
    <el-breadcrumb
      v-if="this.$route.path !== '/'"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/sys/users' }"
        v-for="(item, index) in bread"
        :key="index"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {}
  },
  methods: {},
  computed: {
    bread() {
      return this.$route.matched
    }
  }
}
</script>
<style scoped lang="scss"></style>
