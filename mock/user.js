const {Router} = require("express")
const Mock = require('mockjs')

const NameList = []

for (let i = 0; i < 100; i++) {
    NameList.push(Mock.mock({
        name: '@first'
    }))
}
NameList.push({name: 'mock-Pan'})

const router = Router()

const TOKENS = {
    admin: 'admin-token',
    editor: 'editor-token'
}

const USERS = {
    [TOKENS.admin]: {
        roles: ['admin'],
        introduction: "I am a super administrator",
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    [TOKENS.editor]: {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

router.get('/user/search', (req, res) => {
    const {name} = req.query
    const mockNameList = NameList.filter(item => {
        const lowerCaseName = item.name.toLowerCase()
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
    })
    res.json({data: mockNameList, code: 20000})
})

/**
 * 登录
 */
router.post(
    '/user/login',
    (req, res) => {
        const {username} = req.body
        const token = TOKENS[username]
        if (!token) {
            res.json({
                code: 60204,
                message: 'Account and password are incorrect.'
            })
        } else {
            res.json({data: token, code: 20000})
        }
    }
)

/**
 * 获取用户信息
 */
router.get(
    '/user/info',
    (req, res) => {
        const token = req.get('token')
        const info = USERS[token]
        if (!info) {
            res.json({
                code: 50008,
                message: 'Login failed, unable to get user details.'
            })
        } else {
            res.json({data: info, code: 20000})
        }
    }
)

/**
 * 登出
 */
router.post(
    '/user/logout',
    (req, res) => {
        res.json({data: 'success', code: 20000})
    }
)

module.exports = router
