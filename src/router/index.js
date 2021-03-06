import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '../layout'
import store from '../store'

Vue.use(VueRouter)

NProgress.configure({showSpinner: false})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    try {
        return originalPush.call(this, location).catch(err => err)
    } catch (error) {
        console.log(error)
    }
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    try {
        return originalReplace.call(this, location).catch(err => err)
    } catch (error) {
        console.log(error)
    }
}

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('../views/login'),
        meta: {
            notCertified: true
        },
        hidden: true
    },
    {
        path: '/404',
        component: () => import('../views/error-page/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('../views/dashboard'),
                meta: {title: 'Dashboard', icon: 'dashboard'}
            }
        ]
    },
    {
        path: '/documentation',
        component: Layout,
        redirect: '/documentation/index',
        children: [
            {
                path: 'index',
                component: () => import('../views/documentation'),
                meta: {title: 'Documentation', icon: 'documentation'}
            }
        ]
    },
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        children: [
            {
                path: 'index',
                component: () => import('../views/guide'),
                name: 'Guide',
                meta: {title: 'Guide', icon: 'guide'}
            }
        ]
    }
]

export const asyncRoutes = [
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/page',
        alwaysShow: true,
        meta: {
            title: 'Permission',
            icon: 'lock',
            roles: ['admin', 'editor']
        },
        children: [
            {
                path: 'page',
                component: () => import('../views/permission/page'),
                meta: {
                    title: 'Page Permission',
                    roles: ['admin']
                }
            },
            {
                path: 'directive',
                component: () => import('../views/permission/directive'),
                meta: {
                    title: 'Directive Permission'
                }
            },
            {
                path: 'role',
                component: () => import('../views/permission/role'),
                meta: {
                    title: 'Role Permission',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/icon',
        component: Layout,
        redirect: "/icon/index",
        children: [
            {
                path: 'index',
                component: () => import('../views/icons'),
                meta: {title: 'Icons', icon: 'icon'}
            }
        ]
    },
    {
        path: '/components',
        component: Layout,
        redirect: '/components/tinymce',
        meta: {
            title: 'Components',
            icon: 'component'
        },
        children: [
            {
                path: 'tinymce',
                component: () => import('../views/components/tinymce'),
                meta: {title: 'Tinymce'}
            },
            {
                path: 'markdown',
                component: () => import('../views/components/markdown'),
                meta: {title: 'Markdown'}
            },
            {
                path: 'json-editor',
                component: () => import('../views/components/json-editor'),
                meta: {title: 'JSON Editor'}
            },
            {
                path: 'split-pane',
                component: () => import('../views/components/split-pane'),
                meta: {title: 'SplitPane'}
            },
            {
                path: 'avatar-upload',
                component: () => import('../views/components/avatar-upload'),
                meta: {title: 'Upload'}
            },
            {
                path: 'dropzone',
                component: () => import('../views/components/dropzone'),
                meta: {title: 'Dropzone'}
            },
            {
                path: 'sticky',
                component: () => import('../views/components/sticky'),
                meta: {title: 'Sticky'}
            },
            {
                path: 'count-to',
                component: () => import('../views/components/count-to'),
                meta: {title: 'Count To'}
            },
            {
                path: 'mixin',
                component: () => import('../views/components/mixin'),
                meta: {title: 'Component Mixin'}
            },
            {
                path: 'back-to-top',
                component: () => import('../views/components/back-to-top'),
                meta: {title: 'Back To Top'}
            },
            {
                path: 'drag-dialog',
                component: () => import('../views/components/drag-dialog'),
                meta: {title: 'Drag Dialog'}
            }
        ]
    },
    {
        path: '/charts',
        component: Layout,
        redirect: '/charts/keyboard',
        meta: {
            title: 'Charts',
            icon: 'chart'
        },
        children: [
            {
                path: 'keyboard',
                component: () => import('../views/charts/keyboard'),
                meta: {title: 'Keyboard Chart'}
            },
            {
                path: 'line',
                component: () => import('../views/charts/line'),
                meta: {title: 'Line Chart'}
            },
            {
                path: 'mix-chart',
                component: () => import('../views/charts/mix-chart'),
                meta: {title: 'Mix Chart'}
            }
        ]
    },
    {
        path: '/table',
        component: Layout,
        redirect: '/table/dynamic-table',
        meta: {
            title: 'Table',
            icon: 'table'
        },
        children: [
            {
                path: 'dynamic-table',
                component: () => import('../views/table/dynamic-table'),
                meta: {title: 'Dynamic Table'}
            },
            {
                path: 'complex-table',
                component: () => import('../views/table/complex-table'),
                meta: {title: 'Complex Table'}
            }
        ]
    },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/list',
        meta: {
            title: 'Example',
            icon: 'el-icon-s-help'
        },
        children: [
            {
                path: 'list',
                component: () => import('../views/example/list'),
                meta: {title: 'Article List'}
            },
            {
                path: 'create',
                component: () => import('../views/example/create'),
                meta: {title: 'Create Article'}
            },
            {
                path: 'edit/:id',
                component: () => import('../views/example/edit'),
                name: 'EditArticle',
                meta: {title: 'Edit Article'},
                hidden: true
            }
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
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
                                accessRoutes.forEach(item => {
                                    router.addRoute(item)
                                })
                                next({...to, replace: true})
                            })
                    }
                )
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
