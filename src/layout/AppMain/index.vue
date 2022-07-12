<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <Breadcrumb></Breadcrumb>
      </div>
      <router-view></router-view>
    </el-card>
  </div>
</template>
<script>
import Breadcrumb from '../../components/Breadcrumb'
export default {
  name: 'index',
  data() {
    return {}
  },
  methods: {},
  components: {
    Breadcrumb
  }
}
</script>
<style scoped lang="scss"></style>
