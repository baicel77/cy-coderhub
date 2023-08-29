const KoaRouter = require('@koa/router')
const { create, reply } = require('../controller/comment.controller')
const { verityAuth } = require('../middleware/login.middleware')
const CommentRouter = new KoaRouter({ prefix: '/comment' })

// 1.发表评论
CommentRouter.post('/', verityAuth, create)

// 2.回复评论
CommentRouter.post('/reply', verityAuth, reply)


module.exports = CommentRouter