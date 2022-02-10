import {getToken, removeToken, setToken} from "../../utils/auth"
import {login, getInfo, logout} from "../../api/user"
import router, {resetRouter} from "../../router"

export default {
    namespaced: true,
    state: () => ({
        token: getToken(),
        info: {}
    }),
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_INFO(state, info) {
            state.info = info
        }
    },
    actions: {
        async login({commit}, user) {
            try {
                const token = await login(user)
                commit('SET_TOKEN', token)
                setToken(token)
            } catch (e) {
                throw new Error(e)
            }
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_INFO', {})
                    removeToken()
                    resetRouter()
                    resolve()
                }).catch(reject)
            })
        },
        getInfo({commit}) {
            return new Promise(resolve => {
                getInfo().then(info => {
                    commit('SET_INFO', info)
                    resolve(info)
                })
            })
        },
        resetToken({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_INFO', {})
                removeToken()
                resolve()
            })
        },
        async changeRoles({commit, dispatch}, role) {
            // 修改 token
            const token = role + '-token'
            commit('SET_TOKEN', token)
            setToken(token)
            // 获取用户信息
            const {roles} = await dispatch('getInfo')
            // 重置路由
            resetRouter()
            // 动态添加路由
            const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})
            accessRoutes.forEach(item => {
                router.addRoute(item)
            })
        }
    }
}
