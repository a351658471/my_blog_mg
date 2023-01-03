import request from '@/utils/request'

export function login (params) {
  return request({
      url:'/users/adminLogin',
      method:'get',
      params
  })
}