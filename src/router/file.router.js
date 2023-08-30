const KoaRouter = require('@koa/router')
const { handleUpload, handleOtherFileUpload, getFileById } = require('../controller/file.controller')
const { verityAuth } = require('../middleware/login.middleware')
const { upload } = require('../middleware/file.middleware')
const fileRouter = new KoaRouter({ prefix: '/file' })
// 1.上传头像
fileRouter.post('/avatar', verityAuth, upload.single('avatar'), handleUpload)

// 2.上传其他文件
fileRouter.post('/upload', verityAuth, upload.single('upload'), handleOtherFileUpload)
// 3.获取文件
fileRouter.get('/upload/:id', getFileById)

module.exports = fileRouter