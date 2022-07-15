export const filterRoutes = (menus) => {
  const newRoutes = []
  menus.forEach((item) => {
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        const routes = menuRoutes(child)
        newRoutes.push(routes)
      })
    }
  })
  return newRoutes
}
const menuRoutes = (item) => {
  if (!item.component) {
    return null
  }
  const route = {
    path: item.path,
    name: item.name,
    meta: {
      title: item.label,
      icon: 'el-icon-' + item.icon
    }
  }
  // const path = filterFolder(item.component)
  route.component = () => import('@/views/' + item.component)
  console.log(route)
  return route
}
