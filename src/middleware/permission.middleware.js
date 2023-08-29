const { NOPERMISSION } = require("../config/error")
const { checkPermission } = require("../service/permission.service")

async function verifyPermission(ctx, next) {
  const resourceKey = Object.keys(ctx.request.params)[0]
  const resourceName = resourceKey.replace('Id', '')
  const resourceId = ctx.request.params[resourceKey]

  const { id } = ctx.user
  const permission = await checkPermission(resourceName, resourceId, id)
  if (!permission) {
    return ctx.app.emit('error', NOPERMISSION, ctx)
  }
  await next()
}

module.exports = {
  verifyPermission
}