const fs = require('fs')
const { saveAvatarInfo, getFileInfo, saveFileInfo } = require("../service/file.service")
const { SERVICE_PORT } = require('../config/service')
const { updataAvatarUrl } = require("../service/user.service")
const { UPLOAD_PATH } = require('../config/path')
class fileController {
  async handleUpload(ctx, next) {
    const { mimetype, filename, size } = ctx.file
    const { id } = ctx.user
    const data = await saveAvatarInfo(mimetype, filename, size, id)
    // 更新user表的avatar_url值
    const avatarUrl = `http://localhost:${SERVICE_PORT}/user/avatar/${id}`
    await updataAvatarUrl(avatarUrl, id)
    
    ctx.body = {
      code: 0,
      data,
      message: '上传用户头像成功'
    }
  }
  async handleOtherFileUpload(ctx, next) {
    const { mimetype, filename, size } = ctx.file
    const data = await saveFileInfo(mimetype, filename, size)
    ctx.body = {
      code: 0,
      data,
      message: '上传文件成功'
    }
  }

  async getFileById(ctx) {
    const { id } = ctx.params
    const data = await getFileInfo(id)
    if (data.length) {
      try {
        const { mimetype, filename } = data.pop()
        const readStream = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
        ctx.type = mimetype
        ctx.body = readStream
      } catch (error) {
        console.log(error)
      }
    } else {
      return ctx.app.emit('error', CANT_FIND_AVATAR, ctx)
    }
  }
}

module.exports = new fileController()