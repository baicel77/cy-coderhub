const commentService = require("../service/comment.service")

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { id: userId } = ctx.user
    const comment = { content, momentId, userId }
    const data = await commentService.create(comment)
    ctx.body = {
      code: 0,
      data,
      message: '发表评论成功'
    }
  }
  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body
    const { id: userId } = ctx.user
    const comment = { content, momentId, commentId, userId }
    const data = await commentService.reply(comment)
    ctx.body = {
      code: 0,
      data,
      message: '回复评论成功'
    }
  }
}

module.exports = new CommentController()