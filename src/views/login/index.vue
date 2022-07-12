<template>
  <div class="login-container">
    <h1>智慧服务平台</h1>
    <div class="login-form">
      <h2>欢迎登录</h2>
      <el-form ref="form" :rules="rules" :model="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="请输入账号"
            suffix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            clearable
            v-model.trim="loginForm.password"
            show-password
            placeholder="请输入密码"
            suffix-icon="el-icon-s-goods"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="verify">
            <el-input
              v-model.trim="loginForm.code"
              placeholder="请输入验证码"
            ></el-input>
            <el-image @click.stop="handleRefreshCode" :src="codeImageUrl" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-button"
            :loading="loadingStatus"
            @click="handleVerifyForm"
            type="danger"
            >{{ loadingStatus ? '登录中...' : '立即登录' }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import UserApi from '../../api/user'
import rules from './rules'
import { mapActions } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      loadingStatus: false,
      codeImageUrl: '',
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      rules
    }
  },
  created() {
    this.handleGetCaptcha()
  },
  methods: {
    // 调取验证码接口
    async handleGetCaptcha() {
      const { captchaImg, token } = await UserApi.getCaptcha()
      this.codeImageUrl = captchaImg
      this.loginForm.token = token
    },
    // 点击刷新验证码
    handleRefreshCode() {
      this.loginForm.code = ''
      this.handleGetCaptcha()
    },
    // 登录表单验证
    handleVerifyForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.handleSubmitLogin()
        }
      })
    },
    async handleSubmitLogin() {
      try {
        const token = await this.login(this.loginForm)
        console.log(token)
        if (!token) return
        this.loadingStatus = true
        await this.$router.push('/')
        this.$notify({ title: '提示', message: '登录成功', type: 'success' })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingStatus = false
        // 登录之后表单清空
        this.loginForm = {
          username: '',
          password: '',
          code: '',
          token: ''
        }
      }
    },
    ...mapActions({
      login: 'user/login'
    })
  }
}
</script>
<style scoped lang="scss">
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: Verdana;
  background-size: cover;
  background: url('../../assets/images/wallhaven.png') no-repeat fixed center;
}
h1 {
  text-align: center;
  font-size: 42px;
  margin-top: 50px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 5px;
}
h2 {
  color: #fff;
  font-size: 30px;
  margin-bottom: 30px;
}
.login-form {
  margin: 10% auto 13%;
  width: 20%;
}
.verify {
  width: 100%;
  display: flex;
  align-items: center;
}
.el-image {
  width: 200px;
  height: 40px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
.login-button {
  width: 100%;
  border-radius: 5px;
}
</style>
