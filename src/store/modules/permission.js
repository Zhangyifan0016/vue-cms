import { Publicroutes, Privateroutes } from '../../router'
export default {
  namespaced: true,
  state: {
    routes: Publicroutes
  },
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...Publicroutes, ...newRoutes]
    }
  },
  actions: {
    filterRoutes({ commit }, menus) {
      const routes = []
      menus.forEach((perms) => {
        const data = Privateroutes.filter((item) => {
          return item.perms === perms
        })

        routes.push(...data)
      })
      console.log(routes)
      commit('setRoutes', routes)
      return routes
    }
  }
}
