const {Router} = require("express")
const Mock = require('mockjs')

const router = Router()

router.get(
    '/transaction/list',
    (req, res) => {
        res.json({
            data: Mock.mock({
                "items|20": [
                    {
                        order_no: '@guid()',
                        timestamp: +Mock.Random.date('T'),
                        username: '@name()',
                        price: '@float(1000, 15000, 0, 2)',
                        'status|1': ['success', 'pending']
                    }
                ]
            }).items, total: 20, code: 20000
        })
    }
)

module.exports = router
