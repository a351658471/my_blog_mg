import request from '@/utils/request'

export function saveProfile (data){
  return request({
    url:'/profile/saveProfile',
    method:'post',
    data
})
}

export function getProfile() {
  return request({
    url:'profile/getProfile',
    method:'get'
  })
}