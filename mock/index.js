const express = require('express')

const userRouter = require('./user')
const dashboardRouter = require('./dashboard')
const roleRouter = require('./role')
const uploadRouter = require('./upload')
const articleRouter = require('./article')

const baseURL = process.env["VUE_APP_BASE_API"]

module.exports = function (app) {
    app.use(baseURL, express.static(__dirname + '/files'))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(baseURL, userRouter)
    app.use(baseURL, dashboardRouter)
    app.use(baseURL, roleRouter)
    app.use(baseURL, uploadRouter)
    app.use(baseURL, articleRouter)
}
