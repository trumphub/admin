import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const constantRoutes = [
    {
        path: '/login',
        component: () => import('../views/login')
    },
    {
        path: '/404',
        component: () => import('../views/error-page/404')
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

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
