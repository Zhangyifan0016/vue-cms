const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 9090,
    https: false,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // 开发阶段 代理名称是 /dev-api  生产环境阶段 /pro-api
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/common.scss";'
      }
    }
  }
})
