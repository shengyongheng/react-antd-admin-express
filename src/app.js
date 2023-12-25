const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
// 导入 express-jwt 并解构
const { expressjwt: jwt } = require("express-jwt");
const routes = require("./routes");
// 密钥
const { secretKey } = require("./config/secret");

const app = express();

app.use(cors());

// 使用 express-jwt 中间件
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
    jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
        path: [/^\/api\/access/],
    })
);

// 解析application/x-www-form-urlencoded数据格式
app.use(bodyParser.urlencoded({ extended: true }));

// 解析json数据格式
app.use(bodyParser.json());

//解析 text/plain 数据格式
app.use(bodyParser.text());

app.use("/", routes);

app.listen(4000, () => {
    console.log("server is running");
});
