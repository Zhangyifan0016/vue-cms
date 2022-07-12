import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/layout',
    name: 'layout',
    redirect: '/',
    component: () => import('../layout'),
    children: [
      {
        name: 'home',
        path: '/',
        component: () => import('../views/sys/Home')
      }
    ]
  },
  {
    name: 'manager',
    path: '',
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
