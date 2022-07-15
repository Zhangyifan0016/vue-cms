import layout from '../../layout'

export default {
  name: 'manager',
  path: '/manager',
  perms: 'sys:manage',
  redirect: '/sys/users',
  component: layout,
  meta: {
    title: '系统管理',
    icon: 's-grid'
  },
  children: []
}
