const mysql = require('mysql2')

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'cy_coderhub',
  user: 'root',
  password: 'Czhcy9597.',
  connectionLimit: 5
})

connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('获取连接失败')
    return
  }
  // 获取连接后测试连接
  connection.connect(err => {
    if (err) {
      console.log('和数据库交互失败')
      return
    }
    console.log('数据库连接成功, 可以操作数据库')
  })
})

const connect = connectionPool.promise()

module.exports = connect