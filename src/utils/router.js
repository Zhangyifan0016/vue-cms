// 获得所有非一级路由即所有子路由
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((item) => {
    if (item.children && item.children.length > 0) {
      result.push(...item.children)
    }
  })
  console.log(result)
  return result
}

// 筛选出一级路由
export const filterRoutes = (routes) => {
  // 所有的非一级路由 所有子路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 筛选出一级路由
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

// 检测空对象以及检测空数据
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

export const generateMenus = (routes) => {
  console.log(routes)
  const result = []
  routes.forEach((item) => {
    // 过滤掉登录路由
    if (isNull(item.meta) && isNull(item.children)) return

    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    const routePath = item.path

    let route = result.find((route) => route.path === routePath)

    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      console.log(item)

      if (item.meta.title && item.meta.icon) {
        result.push(route)
      }
    }

    if (item.children) {
      route.children.push(...generateMenus(item.children))
    }
  })
  console.log(result)
  return result
}
