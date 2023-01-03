import { login } from '@/api/admin'
const state = {
  token:null
}

const mutations = {
    SET_TOKEN:(state, token)=>{
        state.token = token
        localStorage.setItem('token',token)
    },
    CLEAN_TOKEN:(state) => {
      state.token = null
      localStorage.removeItem('token')
    }
}
const actions = {
  login(store, userInfo){
   return new Promise((resolve, reject)=> {
    login(userInfo).then(res => {
      store.commit('SET_TOKEN', res.secret)
      resolve(res)
    }).catch(err => {
      reject(err)
    })
   })
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions
}