import layout from '../../layout'

export default {
  name: 'manager',
  path: '/manager',
  perms: 'sys:user:list',
  redirect: '/sys/users',
  component: layout,
  meta: {
    title: '系统管理',
    icon: 's-grid'
  },
  children: [
    {
      name: 'sys-users',
      path: '/sys/users',
      component: () => import('../../views/sys/User'),
      meta: {
        title: '用户管理',
        icon: 'user'
      }
    }
  ]
}
