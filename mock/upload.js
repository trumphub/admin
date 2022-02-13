const {Router} = require("express")
const multer = require('multer')

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/files')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})
const router = Router()

router.post(
    '/upload',
    upload.single('file'),
    (req, res) => {
        res.json({
            location:
                process.env["VUE_APP_BASE_API"] + '/' + req.file.originalname
        })
    }
)

module.exports = router
