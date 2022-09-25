import request from '@/utils/request'

export function uploadImg (data) {
    return request({
        url:'/upload/uploadImg',
        method:'post',
        data,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}