const state = {
  menuRoutes:[]
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