import layout from '../../layout'

export default {
  name: 'manager',
  path: '/manager',
  perms: 'sys:role:list',
  redirect: '/sys/users',
  component: layout,
  meta: {
    title: '系统管理',
    icon: 's-grid'
  },
  children: [
    {
      name: 'sys-roles',
      path: '/sys/roles',
      meta: {
        title: '角色管理',
        icon: 'user-solid'
      },
      component: () => import('../../views/sys/Role')
    }
  ]
}
