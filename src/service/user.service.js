const connect = require("../app/database")

class UserService {
  async create(user) {
    // 1.获取传递过来的参数
    const { name, password } = user
    // 2.编写sql
    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);'
    // 3.执行sql, 获取结果返回给客户端
    const [value] = await connect.execute(statement, [name, password])
    return value
  }
  
  async findUserByname(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    const [value] = await connect.execute(statement, [name])
    return value
  }
}

module.exports = new UserService()