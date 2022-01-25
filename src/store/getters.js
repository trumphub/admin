export default {
    token(state) {
        return state.user.token
    },
    info(state) {
        return state.user.info
    },
    collapse(state) {
        return state.app.collapse
    },
    permission_routes(state) {
        return state.permission.routes
    }
}
