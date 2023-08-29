const app = require('./app')
const { SERVICE_PORT } = require('./config/service')
require('./utils/handle-error')

app.listen(SERVICE_PORT, () => {
  console.log('koa服务器开启成功')
})