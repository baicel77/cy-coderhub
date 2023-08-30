const { create } = require("../service/label.service")

class labelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const data = await create(name)
    ctx.body = {
      code: 0,
      data,
      message: '创建标签成功'
    }
  }
}

module.exports = new labelController()