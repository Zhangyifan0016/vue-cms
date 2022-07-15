import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决vue路由重复问题
const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/',
    component: () => import('../layout'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          title: '控制台',
          icon: 's-home'
        },
        component: () => import('../views/sys/Home')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
