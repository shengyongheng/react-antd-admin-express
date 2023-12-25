const connection = require('../db/index');
// 导入 bcryptjs
const bcrypt = require("bcryptjs");
// 导入 jwt 生成 token 包
const jwt = require("jsonwebtoken");

// 密钥和token生效时间
const { secretKey, expiresIn } = require("../config/secret");

// 注册
exports.register = function (req, res) {
    const { username, password, userType } = req.body;
    const sql = 'SELECT * FROM access_table where username = ?';
    connection.query(sql, username, function (err, result) {
        // 执行 SQL 语句失败
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return res.send({ status: 500, msg: err.message });;
        }
        // 判断用户名是否被占用
        if (result.length > 0) {
            return res.send({ status: 500, msg: '用户名已存在' });
        }
        // 调用 bcrypt.hashSync() 对密码进行加密
        const hashPassword = bcrypt.hashSync(password, 10);
        // 定义插入新用户的 SQL 语句
        const sql = "INSERT INTO access_table (username, password, usertype) VALUES (?,?,?)";
        // 执行 SQL 语句
        connection.query(sql, [username, hashPassword, userType], function (err, result) {
            // 执行 SQL 语句失败
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return res.send({ status: 500, msg: err.message });
            }
            // 判断影响行数是否为 1
            if (result.affectedRows === 1) {
                return res.send({ status: 200, msg: '注册成功' });
            } else {
                return res.send({ status: 500, msg: '注册失败' });
            }
        });
    })
}

// 登录
exports.login = (req, res) => {
    const { username, password } = req.body;
    // 定义查询用户名的 SQL 语句
    const sql = "SELECT * FROM access_table WHERE username = ?";
    // 执行 SQL 语句
    connection.query(sql, username, function (err, result) {
        // 执行 SQL 语句失败
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return res.send({ status: 500, msg: err.message });
        }
        if (result.length === 0) {
            return res.send({ status: 500, msg: '用户名不存在' });
        }
        // 判断密码是否正确
        const flag = bcrypt.compareSync(password, result[0].password);
        if (!flag) return res.send({ status: 403, msg: "登录失败，密码错误！" });
        // 生成 token
        const token = jwt.sign({
            username: result[0].username
        }, secretKey, { expiresIn });
        // 返回 token 信息
        return res.send({
            status: 200,
            message: '登录成功',
            data: {
                token: token,
                userType: result[0].userType
            }
        });
    })
}
