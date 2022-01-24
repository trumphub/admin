import axios from "axios"
import {Message} from 'element-ui'
import store from '../store'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['token'] = store.getters.token
    }
    return config
}, error => Promise.reject(error))

service.interceptors.response.use(response => {
    const res = response.data
    if (res.code !== 20000) {
        Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5000
        })
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            store.dispatch('user/resetToken').then(() => {
                location.reload()
            })
        }
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
        return res.data
    }
}, error => {
    Message({
        message: error.message,
        type: 'error',
        duration: 5000
    })
    return Promise.reject(error)
})

export default service
