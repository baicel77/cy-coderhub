const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secret')

class loginController {
  login(ctx, next) {
    const { id, name } = ctx.user
    // 颁发token
    const payload = { id, name }
    try {
      const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60,
        algorithm: 'RS256'
      })
      ctx.body = { code: 0, data: { id, name, token }}
    } catch (error) {
      console.log(error)
    }
  }

  test(ctx, next) {
    ctx.body = 'token有效, 可以访问别的接口~'
  }
}

module.exports = new loginController()