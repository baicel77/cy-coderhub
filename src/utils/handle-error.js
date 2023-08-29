const app = require('../app')
const { USER_NAME_OR_PASSWORD_IS_NULL, USER_NAME_ALREADY_EXISTS, USER_IS_NOT_EXISTS, PASSWORD_IS_INCORRECT, USER_IS_UNAUTHORIZATION, NOPERMISSION } = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  switch (error) {
    case USER_NAME_OR_PASSWORD_IS_NULL:
      code = -1001
      message = '用户名或者密码不能为空'
      break;
    case USER_NAME_ALREADY_EXISTS:
      code = -1002
      message = '用户名已经存在'
      break;
    case USER_IS_NOT_EXISTS:
      code = -1003
      message = '登录失败, 用户不存在'
      break;
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = '登录失败, 密码不正确'
      break;
    case USER_IS_UNAUTHORIZATION:
      code = -1005
      message = '无效的token'
      break;
    case NOPERMISSION:
      code = -2001
      message = '没有操作该资源的权限'
      break;
  }
  ctx.body = {
    code,
    message
  }
})