const fs = require('fs')
const userService = require("../service/user.service")
const { getAvatarInfo } = require('../service/file.service')
const { UPLOAD_PATH } = require('../config/path')
const { CANT_FIND_AVATAR } = require('../config/error')

class UserController {
  async create(ctx) {
    // 1.获取body参数
    const user = ctx.request.body
    // 2.执行服务
    const result = await userService.create(user)
    // 3. 给客户端返回结果
    ctx.body = {
      message: '创建用户成功',
      data: result
    }
  }
  async getAvatarById(ctx) {
    const { id } = ctx.params
    const data = await getAvatarInfo(id)
    if (data.length) {
      const { mimetype, filename } = data.pop()
      const readStream = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
      ctx.type = mimetype
      ctx.body = readStream
    } else {
      return ctx.app.emit('error', CANT_FIND_AVATAR, ctx)
    }
  }
}

module.exports = new UserController()