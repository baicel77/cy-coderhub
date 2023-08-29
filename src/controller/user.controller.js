const userService = require("../service/user.service")

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
}

module.exports = new UserController()