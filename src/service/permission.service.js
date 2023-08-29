const connect = require("../app/database")

class PermissionService {
  async checkPermission(resourceName, resourceId, userId) {
    const statement = `
      SELECT 
      m.id id,
      m.content content,
      m.createAt createAt,
      m.updateAt updateAt,
      JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt) AS user
      FROM ${resourceName} m
      LEFT JOIN user u 
      ON m.user_id = u.id 
      WHERE m.id = ? AND u.id = ?;
    `
    const [value] = await connect.execute(statement, [resourceId, userId])
    return !!value.length
  }
}
module.exports = new PermissionService()