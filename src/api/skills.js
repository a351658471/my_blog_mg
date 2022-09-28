import request from '@/utils/request'

export function saveSkill(data){
  return request({
    url:'/skills/saveSkill',
    method:'post',
    data
  })
}

export function getSkills(params){
  return request({
    url:'/skills/getSkills',
    method:'get',
    params
  })
}

export function deleteSkill(params) {
  return request({
    url:`/skills/deleteSkill/${params}`,
    method:'delete',
  })
}