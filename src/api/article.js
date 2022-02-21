import request from '../utils/request'

export function getArticleList(query) {
    return request({
        url: '/article/list',
        method: 'GET',
        params: query
    })
}

export function deleteArticleById(id) {
    return request.delete(`/article/${id}`)
}

export function updateArticleStatusById(id, status) {
    return request.put(`/article/${id}`, {status})
}

export function createArticle(data) {
    return request({
        url: '/article/create',
        method: 'post',
        data
    })
}

export function updateArticle(index, data) {
    return request({
        url: `/article/update/${index}`,
        method: 'put',
        data
    })
}
