const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors'); 
const routes = require("./routes"); 

const app = express();

app.use(cors()); 

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
