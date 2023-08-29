const connect = require("../app/database")

class CommentService {
  async create(comment) {
    const { content, momentId, userId } = comment
    const statement = 'INSERT INTO `comment` (content, moment_id, user_id) VALUES (?, ?, ?);'
    const [value] = await connect.execute(statement, [content, momentId, userId])
    return value
  }

  async reply(comment) {
    const { content, momentId, commentId, userId } = comment
    const statement = 'INSERT INTO `comment` (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);'
    const [value] = await connect.execute(statement, [content, momentId, commentId, userId])
    return value
  }

}
module.exports = new CommentService()