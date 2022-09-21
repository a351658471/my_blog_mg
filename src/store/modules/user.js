const state = {
    token:''
}

const mutations = {
    SET_TOKEN:(state, token)=>{
        state.token = token
    }
}

export default {
  amespaced:true,
  state,
  mutations
}