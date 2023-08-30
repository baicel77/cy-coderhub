const connect = require("../app/database")

class fileService {
  async saveAvatarInfo(mimetype, filename, size, userId) {
    const statement = 'INSERT INTO avatar (mimetype, filename, size, user_id) VALUES (?, ?, ?, ?);'
    const [value] = await connect.execute(statement, [mimetype, filename, size, userId])
    return value
  }
  async getAvatarInfo(userId) {
    const statement = 'SELECT * FROM avatar WHERE user_id = ?;'
    const [value] = await connect.execute(statement, [userId])
    return value
  }
  async saveFileInfo(mimetype, filename, size) {
    const statement = 'INSERT INTO file (mimetype, filename, size) VALUES (?, ?, ?);'
    const [value] = await connect.execute(statement, [mimetype, filename, size])
    return value
  }
  async getFileInfo(id) {
    const statement = 'SELECT * FROM file WHERE id = ?;'
    const [value] = await connect.execute(statement, [id])
    return value
  }
}
module.exports = new fileService()