const jwt = require('jsonwebtoken')
const { USER_NAME_OR_PASSWORD_IS_NULL, USER_IS_NOT_EXISTS, PASSWORD_IS_INCORRECT, USER_IS_UNAUTHORIZATION } = require("../config/error")
const { findUserByname } = require("../service/user.service")
const md5password = require("../utils/md5-password")
const { PUBLIC_KEY } = require('../config/secret')

async function verifyLogin(ctx, next) {
  // 1.判断用户名和密码是否输入
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit('error', USER_NAME_OR_PASSWORD_IS_NULL, ctx)
  }
  // 2.判断用户名是否在数据库中存在
  const user = await findUserByname(name)
  if (!user.length) {
    return ctx.app.emit('error', USER_IS_NOT_EXISTS, ctx)
  }
  // 3.判断用户名和密码是否正确
  const md5pwd = md5password(password)
  if (md5pwd !== user[0].password) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
  }

  // 保存user到ctx中
  ctx.user = user[0]

  // 验证登录通过,执行下一个中间件
  await next()
}

async function verityAuth(ctx, next) {
  // 1.获取token
  const authorization = ctx.headers.authorization
  const token = authorization?.replace('Bearer ', '')
  try {
  // 2.验证token
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = res
    await next()
  } catch (error) {
    console.log(error)
    return ctx.app.emit('error', USER_IS_UNAUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verityAuth
}