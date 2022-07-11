import UserApi from '../../api/user'
import { setItem, getItem } from '../../utils/storage'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async login({ commit }, loginForm) {
      const token = await UserApi.login(loginForm)
      commit('setToken', token)
      return token
    },
    async getUserInfo({ commit }) {
      const res = await UserApi.getUserInfo()
      console.log(res)
      return res
    }
  }
}
