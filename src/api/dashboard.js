import request from '../utils/request'

export function getTransactionList() {
    return request({
        url: `/transaction/list`,
        method: 'GET',
    })
}
