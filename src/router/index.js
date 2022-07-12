import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决vue路由重复问题
const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
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
          title: '控制台'
        },
        component: () => import('../views/sys/Home')
      }
    ]
  },

  {
    name: 'manager',
    path: '/manager',
    component: () => import('../layout'),
    meta: {
      title: '系统管理'
    },
    children: [
      {
        name: 'sys-users',
        path: '/sys/users',
        component: () => import('../views/sys/User'),
        meta: {
          title: '用户管理'
        }
      },
      {
        name: 'sys-roles',
        path: '/sys/roles',
        meta: {
          title: '角色管理'
        },
        component: () => import('../views/sys/Role')
      },
      {
        name: 'sys-menus',
        path: '/sys/menus',
        meta: {
          title: '菜单管理'
        },
        component: () => import('../views/sys/Menu')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
