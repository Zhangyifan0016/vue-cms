import layout from '../../layout'

export default {
  name: 'manager',
  path: '/manager',
  perms: 'sys:menu:list',
  redirect: '/sys/users',
  component: layout,
  meta: {
    title: '系统管理',
    icon: 's-grid'
  },
  children: [
    {
      path: '/sys/menus',
      name: 'menus',
      component: () => import('../../views/sys/Menu'),
      meta: {
        title: '菜单管理',
        icon: 'menu'
      }
    }
  ]
}
