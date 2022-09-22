import request from '@/utils/request'

export function addNote (data) {
    return request({
        url:'/notes/addNote',
        method:'post',
        data
    })
}

export function getNotes(params) {
  return request({
    url:'/notes/queryNotes',
    method:'get',
    params,
  })
}

export function deleteNote(params) {
  return request({
    url:`/notes/deleteNote/${params}`,
    method:'delete',
  })
}

export function editNote(data) {
  return request({
    url:'/notes/editNote',
    method:'post',
    data
})
}