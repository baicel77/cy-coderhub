const momentService = require("../service/moment.service")

class momentController {
  async create(ctx, next) {
    const { content } = ctx.request.body
    const { id } = ctx.user
    const payload = { content, id }
    const data = await momentService.create(payload)
    ctx.body = {
      code: 0,
      message: '发表动态成功',
      data
    }
  }
  async query(ctx, next) {
    const { size = 10, offset = 0 } = ctx.query
    const data = await momentService.query(size, offset)
    ctx.body = {
      code: 0,
      data
    }
  }
  async detail(ctx, next) {
    const { momentId } = ctx.params
    const data = await momentService.detail(momentId)
    ctx.body = {
      code: 0,
      data: data[0] || {}
    }
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const data = await momentService.update(content, momentId)
    ctx.body = {
      code: 0,
      message: '修改动态成功',
      data
    }
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const data = await momentService.remove(momentId)
    ctx.body = {
      code: 0,
      message: '删除动态成功',
      data
    }
  }

}

module.exports = new momentController()