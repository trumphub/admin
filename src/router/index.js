import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '../layout'
import store from '../store'

Vue.use(VueRouter)

NProgress.configure({showSpinner: false})

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('../views/login'),
        meta: {
            notCertified: true
        }
    },
    {
        path: '/404',
        component: () => import('../views/error-page/404')
    },
    {
        path: '/',
        component: Layout
    }
]

export const asyncRoutes = [
    {
        path: '/406',
        component: () => import('../views/error-page/404'),
        meta: {
            roles: ['admin']
        }
    }
]

const createRouter = () => new VueRouter({
    mode: 'history',
    scrollBehavior() {
        return {y: 0}
    },
    routes: constantRoutes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
    NProgress.start()
    // 修改标题
    document.title = to.meta.title ? `${to.meta.title} - vue Element Admin` : 'vue Element Admin'

    const token = store.getters.token

    if (token) {
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done()
        } else {
            const roles = store.getters.info.roles
            if (roles) {
                next()
            } else {
                store.dispatch('user/getInfo').then(
                    info => {
                        store.dispatch('permission/generateRoutes', info.roles)
                            .then(accessRoutes => {
                                router.addRoutes(accessRoutes)
                                next({...to, replace: true})
                            })
                    }
                ).catch(() => {
                    store.dispatch('user/resetToken')
                        .then(() => {
                            next({path: '/login', query: {redirect: to.fullPath}})
                            NProgress.done()
                        })
                })
            }
        }
    } else {
        if (to.meta.notCertified) {
            next()
        } else {
            next({path: '/login', query: {redirect: to.fullPath}})
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
