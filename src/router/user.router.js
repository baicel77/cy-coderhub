const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new KoaRouter({ prefix: '/user' })

// 1.注册
userRouter.post('/', verifyUser, handlePassword, userController.create)
// 2.获取用户头像
userRouter.get('/avatar/:id', userController.getAvatarById)

module.exports = userRouter