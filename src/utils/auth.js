import Cookie from 'js-cookie'

const TokenKey = 'user-token'

export function getToken() {
    Cookie.get(TokenKey)
}

export function setToken(token) {
    Cookie.set(TokenKey, token)
}

export function removeToken() {
    Cookie.remove(TokenKey)
}
