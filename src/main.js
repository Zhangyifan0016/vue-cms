import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入页面鉴权
import './permission'
// 引入公共样式
import './styles/reset.scss'
import { Plugin } from 'vue-fragment'
Vue.use(Plugin)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
