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
      JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt) AS user
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
    const statement = `
      SELECT 
      m.id id,
      m.content content,
      m.createAt createAt,
      m.updateAt updateAt,
      JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt) AS user
      FROM moment m 
      LEFT JOIN user u 
      ON m.user_id = u.id 
      WHERE m.id = ?;
    `
    // 执行sql
    const [value] = await connect.execute(statement, [id])
    return value
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

}
module.exports = new MomentService()