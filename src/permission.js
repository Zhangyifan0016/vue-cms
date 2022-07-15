// 引入router
import router from './router'
// 引入vuex
import store from './store'

import { filterRoutes } from './utils/router'

// 设置白名单
const whiteList = ['/login']

// 挂载路由守卫
router.beforeEach(async (to, from, next) => {
  // 获取token
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      if (!store.getters.hasUserInfo) {
        // 调取用户信息接口
        const res = await store.dispatch('user/getUserInfo')
        if (res) {
          const nav = await store.dispatch('user/getMenuList')
          const { menus } = nav
          const routes = filterRoutes(menus)
          console.log(routes)

          if (routes.length > 0) {
            routes.forEach((item) => {
              router.addRoute('layout', item)
            })
            routes.push({
              path: '/:catchAll(.*)', // 不识别的path自动匹配404
              redirect: '/404'
            })
            return next(to.path)
          }
          next()
        } else {
          next('/login')
        }
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
