const { USER_NAME_OR_PASSWORD_IS_NULL, USER_NAME_ALREADY_EXISTS } = require("../config/error")
const { findUserByname } = require("../service/user.service")
const md5password = require("../utils/md5-password")

const verifyUser = async (ctx, next) => {
  // 1.获取用户注册的参数
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit('error', USER_NAME_OR_PASSWORD_IS_NULL, ctx)
  }
  // 2.判断该用户之前是否已经注册
  const result = await findUserByname(name)
  if (result.length) {
    return ctx.app.emit('error', USER_NAME_ALREADY_EXISTS, ctx)
  }
  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}