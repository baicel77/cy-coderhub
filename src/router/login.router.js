const KoaRouter = require('@koa/router')
const { login, test } = require('../controller/login.controller')
const { verifyLogin, verityAuth } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, login)
loginRouter.post('/test', verityAuth, test)

module.exports = loginRouter