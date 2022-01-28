import Cookie from 'js-cookie'

export default {
    namespaced: true,
    state: () => ({
        // 0 false open
        // 1 true close
        collapse: Cookie.get('collapse') ? !!+Cookie.get('collapse') : false,
        theme: 'light-theme'
    }),
    mutations: {
        SET_COLLAPSE(state, collapse) {
            state.collapse = collapse
        },
        SET_THEME(state, theme) {
            state.theme = theme
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
