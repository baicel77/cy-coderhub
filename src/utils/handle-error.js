const app = require('../app')
const { USER_NAME_OR_PASSWORD_IS_NULL, USER_NAME_ALREADY_EXISTS } = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  switch (error) {
    case USER_NAME_OR_PASSWORD_IS_NULL:
      code = -1001
      message = '注册失败, 用户名或者密码不能为空'
      break;
    case USER_NAME_ALREADY_EXISTS:
      code = -1002
      message = '注册失败, 用户名已经存在'
  }
  ctx.body = {
    code,
    message
  }
})