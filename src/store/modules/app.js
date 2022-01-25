import Cookie from 'js-cookie'

export default {
    namespaced: true,
    state: () => ({
        // 0 open 1 close
        collapse: Cookie.get('collapse') ? !!+Cookie.get('collapse') : false
    }),
    mutations: {
        SET_COLLAPSE(state, collapse) {
            state.collapse = collapse
        }
    },
    actions: {
        toggleSideBar({commit}) {
            const collapse = !!+Cookie.get('collapse')
            Cookie.set('collapse', collapse ? '0' : '1')
            commit('SET_COLLAPSE', !collapse)
        }
    }
}
