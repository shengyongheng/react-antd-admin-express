const express = require("express");
const userRouter = require("./users");

const router = express.Router();

router.use("/api/user", userRouter); // 注入用户路由模块

module.exports = router;
