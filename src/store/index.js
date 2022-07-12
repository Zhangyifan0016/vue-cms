import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    tagsView
  }
})
