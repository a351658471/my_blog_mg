const state = {
    isCollapse:false
}
const mutations = {
    SET_ISCOLLAPSE: (state, value) => {
      state.isCollapse = value
      console.log('state.isCollapse',state.isCollapse);
    }
  }
  
  
  export default {
    namespaced:true,
    state,
    mutations
  }