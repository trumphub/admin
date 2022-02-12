import request from '../utils/request'

export function getRoles() {
    return request({
        url: `/roles`,
        method: 'GET',
    })
}

export function getRoutes() {
    return request({
        url: `/routes`,
        method: 'GET',
    })
}

export function addRole(role) {
    return request({
        url: `/role`,
        method: 'POST',
        data: {role}
    })
}

export function updateRole(role) {
    return request({
        url: `/role`,
        method: 'PUT',
        data: {role}
    })
}

export function deleteRole(key) {
    return request({
        url: `/role/${key}`,
        method: 'DELETE'
    })
}
