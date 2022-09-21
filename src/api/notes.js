import request from '@/utils/request'

export function addNote (data) {
    request({
        url:'/notes/addNote',
        method:'post',
        data
    })
}