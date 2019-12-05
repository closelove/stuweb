import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/stuAdmin/login',
        method: 'post',
        data
    })
}

export function user(data) {
    return request({
        url: '/user/user',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
