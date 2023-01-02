import axios from 'axios'
import { ElMessageBox , ElMessage  } from 'element-plus'
import store from '@/store'
import router from '@/router';
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if(store.getters.token){
            config.headers['Authorization'] ='bearer '+ store.getters.token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        console.log('res',res);
        if (res.code === 0) {
          return Promise.resolve(res)
        } else if(res.code === 401){
          return router.replace('/login')
        }else {
          return Promise.reject(response.data)
        }
      },
      error => {
        console.log('err' + error) // for debug
        ElMessage ({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
)

export default service