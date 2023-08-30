const KoaRouter = require('@koa/router')
const { create } = require('../controller/label.controller')
const { verityAuth } = require('../middleware/login.middleware')
const labelRouter = new KoaRouter({ prefix: '/label' })
// 1.创建标签
labelRouter.post('/', verityAuth,  create)

module.exports = labelRouter