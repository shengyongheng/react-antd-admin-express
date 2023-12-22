const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'test'
})
connection.connect()

module.exports = connection;

/**
 * 创建表
 * CREATE TABLE users_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age INT,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    birthdate DATE,
    state BOOLEAN DEFAULT TRUE
   );
   插入数据
   INSERT INTO users_table (id, age, name, address, birthdate, state)
   VALUES (1, 42, 'John Doe', 'New York No. 1 Lake Park', '1990-01-01', true),
          (2, 23, '衡盛永', '上海市 浦东新区', '2000-02-23', true);
   删除数据恢复
   UPDATE users_table SET state = 1 WHERE state = 0;
 */