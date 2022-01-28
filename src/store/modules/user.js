import {getToken, removeToken, setToken} from "../../utils/auth"
import {login, getInfo, logout} from "../../api/user"
import {resetRouter} from "../../router"

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
        }
    }
}
