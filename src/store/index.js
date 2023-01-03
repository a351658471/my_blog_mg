import { createStore } from 'vuex'
import routes from './modules/routes'
import common from './modules/common'
import user from './modules/user'
import getters from './getters'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters,
  modules: {
    user,
    routes,
    common,
  }
})
