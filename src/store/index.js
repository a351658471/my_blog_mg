import { createStore } from 'vuex'
import routes from './modules/routes'
import common from './modules/common'
import getters from './getters'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    routes,
    common,
    getters
  }
})
