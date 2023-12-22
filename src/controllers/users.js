const connection = require('../db/index');
const moment = require('moment')

    // 获取用户列表
    exports.getUserslist = function (req, res) {
        const sql = 'SELECT id, age, name, address, birthdate FROM users_table where state = ?';
        connection.query(sql, 1, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            result.forEach(item => {
                item.birthdate = moment(item.birthdate).format('YYYY-MM-DD')
            })
            const apiRes = {
                code: 200,
                message: "成功",
                data: result
            }
            res.send(apiRes)
        });

        // connection.end();  MYsql nodejs 出现错误之 Cannot enqueue Query after invoking quit.
    }

// 添加用户
exports.addUsers = function (req, res) {
    console.log(req.body);
    const { id, age, name, address, birthdate } = req.body;
    const sql = `INSERT INTO users_table (age, name, address, birthdate, state) VALUES(?,?,?,?,?)`;
    connection.query(sql, [age, name, address, moment(birthdate).format('YYYY-MM-DD'), 1], function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        if (result.affectedRows == 1) {
            let apiRes = {
                code: 0,
                message: "成功",
                data: "恭喜您，新增成功啦..."
            }
            res.send(apiRes)
        } else {
            let apiRes = {
                code: 0,
                message: "失败",
                data: "抱歉新增失败"
            }
            res.send(apiRes)
        }

        res.send(apiRes)
    });

    // connection.end();  MYsql nodejs 出现错误之 Cannot enqueue Query after invoking quit.
}

// 删除用户
exports.deleteUsers = function (req, res) {
    const id = req.body.id;
    const sql = 'UPDATE users_table SET state = ? where id = ?';
    connection.query(sql, [0, id], function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
        const apiRes = {
            code: 200,
            message: "删除成功",
        }
        res.send(apiRes)
    });
}

// 获取用户详细信息
exports.getUsersDetail = function (req, res) {
    const id = req.query.id;
    const sql = 'SELECT name,birthdate,address,age FROM users_table where id = ?';
    connection.query(sql, id, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        const apiRes = {
            code: 200,
            message: "成功",
            data: result[0]
        }
        res.send(apiRes)
    });
}