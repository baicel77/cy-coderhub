const connect = require("../app/database")

class labelService {
  async create(name) {
    const statement = 'INSERT INTO `label` (name) VALUES (?);'
    const [value] = await connect.execute(statement, [name])
    return value
  }
  async queryLabelByName(name) {
    const statement = 'SELECT * FROM label WHERE name = ?;'
    const [value] = await connect.execute(statement, [name])
    return value
  }
}
module.exports = new labelService()