<template>
  <div class="header">
    <div class="left">
      <el-button
        :icon="
          $store.getters.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
        "
        @click="handleChange"
      ></el-button>
      <TagsView></TagsView>
    </div>
    <div class="right">
      <ScreenFull class="screenFull"></ScreenFull>
      <el-tooltip effect="dark" content="关闭全部标签" placement="bottom">
        <i
          @click="handleRemoveAllTags"
          class="el-icon-circle-close hand white"
          style="font-size: 25px"
        ></i>
      </el-tooltip>
      <el-avatar :size="40" :src="userInfo.avatar"></el-avatar>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.username
          }}<i class="el-icon-arrow-down el-icon--right"></i>
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
import ScreenFull from '../../components/ScreenFull'
import TagsView from '../../components/TagsView'

export default {
  name: 'index',
  data() {
    return {}
  },
  components: {
    TagsView,
    ScreenFull
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'personSetting':
          this.personSetting()
          break
        case 'logout':
          this.handleLogout()
          break
      }
    },
    personSetting() {
      console.log(123)
    },
    // 退出登录
    handleLogout() {
      this.$confirm('您确定退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          this.$notify({
            title: '提示',
            message: '正在退出...',
            type: 'success',
            duration: 500
          })
          await this.$store.dispatch('user/logout')
          this.$nextTick(() => {
            // 跳转到登录页面
            this.$router.push('/login')
          })

          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          console.log('取消')
        })
    },
    handleChange() {
      this.$store.dispatch('menus/changeCollapse')
    },
    handleRemoveAllTags() {
      this.$store.dispatch('tagsView/removeAllTag')
      this.$router.push('/')
    }
  },
  computed: {
    userInfo() {
      console.log(this.$store.getters.userInfo)
      return this.$store.getters.userInfo
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  height: 60px;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .el-button {
      border: none;
      background: none;
      color: #ffffff;
      font-size: 25px;
      height: 60px;
      padding: 0;
    }
  }

  .right {
    display: flex;
    align-items: center;
    .el-avatar {
      cursor: pointer;
      margin-right: 10px;
    }
    .el-dropdown-link {
      cursor: pointer;
      font-size: 18px;
      color: #ffffff;
    }
    .el-tooltip {
      margin-right: 15px;
    }
    .screenFull {
      cursor: pointer;
      font-size: 25px;
      color: #ffffff;
      margin-right: 10px;
    }
  }
}
</style>
