// 引入router
import router from './router'
// 引入vuex
import store from './store'
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
          const authoritys = nav.authoritys
          const filterRoutes = await store.dispatch(
            'permission/filterRoutes',
            authoritys
          )
          filterRoutes.forEach((item) => {
            router.addRoute(item)
          })
          return next(to.path)
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
