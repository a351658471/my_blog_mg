const state = {
    isCollapse:false
}
const mutations = {
    SET_ISCOLLAPSE: (state, value) => {
      state.isCollapse = value
    }
  }
  
  
  export default {
    namespaced:true,
    state,
    mutations
  }