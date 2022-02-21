const Mock = require('mockjs')
const {Router} = require("express")
const router = Router()

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img alt="" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        author: '@first',
        reviewer: '@first',
        title: '@title(5, 10)',
        content_short: 'mock data',
        content: baseContent,
        forecast: '@float(0, 100, 2, 2)',
        importance: '@integer(1, 3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['published', 'draft'],
        display_time: '@datetime',
        comment_disabled: true,
        pageviews: '@integer(300, 5000)',
        image_uri,
        platforms: ['a-platform']
    }))
}

router.get(
    '/article/list',
    (req, res) => {
        const {importance, type, title, page = 1, limit = 20, sort} = req.query
        let mockList = List.filter(item => {
            if (importance && item.importance !== +importance) return false
            if (type && item.type !== type) return false
            return !(title && item.title.indexOf(title) < 0);

        })
        if (sort === '-id') {
            mockList = mockList.reverse()
        }
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        res.json({
            data: {
                total: mockList.length,
                items: pageList
            }, code: 20000
        })
    }
)

router.delete('/article/:id', (req, res) => {
    const idx = List.findIndex(item => item.id === +req.params.id)
    List.splice(idx, 1)
    res.json({
        data: "删除成功", code: 20000
    })
})

router.put('/article/:id', (req, res) => {
    List.forEach(item => {
        if (item.id === +req.params.id) {
            item.status = req.body.status
        }
    })
    res.json({
        data: "更新成功", code: 20000
    })
})

router.post('/article/create', (req, res) => {
    List.unshift(req.body)
    res.json({
        data: "添加成功", code: 20000
    })
})

router.put('/article/update/:index', (req, res) => {
    List.splice(+req.params.index, 1, req.body)
    res.json({
        data: "修改成功", code: 20000
    })
})

module.exports = router
