const {Router} = require("express")
const routes = require('./routes')

const router = Router()

const roles = [
    {
        key: 'admin',
        name: 'admin',
        description: 'Super Administrator. Have access to view all pages.',
        routes
    },
    {
        key: 'editor',
        name: 'editor',
        description: 'Normal Editor. Can see all pages except permission page',
        routes: routes.filter(route => route.path !== '/permission')
    },
    {
        key: 'visitor',
        name: 'visitor',
        description: 'Just a visitor. Can only see the home page and the document page',
        routes: routes.filter(route => route.path !== '/charts')
    }
]

router.get(
    '/roles',
    (req, res) => {
        res.json({data: roles, code: 20000})
    }
)

router.get(
    '/routes',
    (req, res) => {
        res.json({data: routes, code: 20000})
    }
)

router.post(
    '/role',
    (req, res) => {
        roles.push(req.body.role)
        res.json({data: "添加成功", code: 20000})
    }
)

router.put(
    '/role',
    (req, res) => {
        const index = roles.findIndex(role => role.key === req.body.role.key)
        roles.splice(index, 1, req.body.role)
        res.json({data: "更新成功", code: 20000})
    }
)

router.delete(
    '/role/:key',
    (req, res) => {
        const index = roles.findIndex(role => role.key === req.params.key)
        roles.splice(index, 1)
        res.json({data: "删除成功", code: 20000})
    }
)

module.exports = router
