const state = {
  menuRoutes:[1,2]
}

const mutations = {
  SET_MENUROUTES: (state, routes) => {
    state.menuRoutes = routes
  }
}


export default {
  namespaced:true,
  state,
  mutations
}