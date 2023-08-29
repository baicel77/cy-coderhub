const fs = require('fs')
function registerRouters(app) {
  const files = fs.readdirSync(__dirname)
  files.forEach(item => {
    if (item.endsWith('router.js')) {
      const router = require('./' + item)
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  })
}

module.exports = registerRouters