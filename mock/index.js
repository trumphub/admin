const express = require('express')

const userRouter = require('./user')

const baseURL = process.env["VUE_APP_BASE_API"]

module.exports = function (app) {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(baseURL, userRouter)
}