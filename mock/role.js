const {Router} = require("express")

const router = Router()

const roles = [
    {
        key: 'admin',
        name: 'admin',
        description: 'Super Administrator. Have access to view all pages.',
    },
    {
        key: 'editor',
        name: 'editor',
        description: 'Normal Editor. Can see all pages except permission page',
    },
    {
        key: 'visitor',
        name: 'visitor',
        description: 'Just a visitor. Can only see the home page and the document page',
    }
]

router.get(
    '/roles',
    (req, res) => {
        res.json({data: roles, code: 20000})
    }
)

module.exports = router
