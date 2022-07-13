export default {
  namespaced: true,
  state: {
    collapse: false
  },
  mutations: {
    setCollapse(state) {
      state.collapse = !state.collapse
    }
  },
  actions: {
    changeCollapse({ commit }) {
      commit('setCollapse')
    }
  }
}
