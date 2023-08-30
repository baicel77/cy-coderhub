const connect = require("../app/database")

class MomentService {
  async create(moment) {
    // 1.获取参数
    const { content, id } = moment
    // 2. 编写SQL
    const statement = 'INSERT INTO moment (content, user_id) VALUES (?, ?);'
    // 3. 将结果返回给客户端
    const [value] = await connect.execute(statement, [content, id])
    return value
  }
  async query(limit, offset) {
    // 编写sql
    const statement = `
      SELECT 
      m.id id,
      m.content content,
      m.createAt createAt,
      m.updateAt updateAt,
      JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt, 'avatar_url', u.avatar_url) AS user,
      (SELECT COUNT(*) FROM comment cm WHERE cm.moment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m 
      LEFT JOIN user u 
      ON m.user_id = u.id 
      LIMIT ? OFFSET ?;
    `
    // 执行sql
    const [value] = await connect.execute(statement, [limit, offset])
    return value
  }
  async detail(id) {
    // 编写sql
    try {
      const statement = `
        SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt, 'avatar_url', u.avatar_url) AS user,
        IF(COUNT(cm.moment_id),JSON_ARRAYAGG(JSON_OBJECT('id', cm.id, 'content', cm.content, 'updateAt', cm.updateAt, 'user_id', cm.user_id, 'comment_id', cm.comment_id)),NULL) comments,
        (
          SELECT IF(COUNT(ml.label_id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name, 'user_id', ml.user_id)), NULL)
          FROM moment m LEFT JOIN moment_label ml ON m.id = ml.moment_id LEFT JOIN label l ON l.id = ml.label_id WHERE m.id = ${id}
        ) labels
        FROM moment m 
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN comment cm ON cm.moment_id = m.id
        WHERE m.id = ?
        GROUP BY m.id;
      `
    // 执行sql
      const [value] = await connect.execute(statement, [id])
      return value
    } catch (error) {
      console.log(error)
    }
  }
  async update(content, id) {
    // 编写sql
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    // 执行sql
    const [value] = await connect.execute(statement, [content, id])
    return value
  }
  async remove(id) {
    // 编写sql
    const statement = `DELETE FROM moment WHERE id = ?;`
    // 执行sql
    const [value] = await connect.execute(statement, [id])
    return value
  }
  async addLabel(momentId, labelId, userId) {
    // 编写sql
    const statement = `INSERT INTO moment_label (moment_id, label_id, user_id) VALUES (?, ?, ?);`
    // 执行sql
    const [value] = await connect.execute(statement, [momentId, labelId, userId])
    return value
  }
  async checkExistsLabel(momentId, labelId, userId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ? AND user_id = ?;`
    const [value] = await connect.execute(statement, [momentId, labelId, userId])
    return !!value.length
  }
}
module.exports = new MomentService()