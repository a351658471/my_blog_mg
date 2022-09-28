const state = {
  menuRoutes:[],
  historyRoutes:[]
}

const mutations = {
  SET_MENUROUTES: (state, routes) => {
    state.menuRoutes = routes
  },
  SET_HROUTES:(state, {route, type}) => {
    const index = state.historyRoutes.indexOf(route)
    if(type === 0 && index===-1){
      if(index === -1)state.historyRoutes.push(route)
    }else if(type ===1){
      state.historyRoutes.splice(index,1)
    }
  }
}


export default {
  namespaced:true,
  state,
  mutations
}