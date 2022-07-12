import UserApi from '../../api/user'
import { setItem, getItem } from '../../utils/storage'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: {},
    menuList: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setMenuList(state, menuList) {
      state.menuList = menuList
    }
  },
  actions: {
    async login({ commit }, loginForm) {
      const token = await UserApi.login(loginForm)
      commit('setToken', token)
      return token
    },
    async getUserInfo({ commit }) {
      const userInfo = await UserApi.getUserInfo()
      commit('setUserInfo', userInfo)
      return userInfo
    },
    async getMenuList({ commit }) {
      const nav = await UserApi.getMenuList()
      commit('setMenuList', nav.menus)
      return nav
    }
  }
}
