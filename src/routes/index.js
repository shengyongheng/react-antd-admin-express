const express = require("express");
const userRouter = require("./users");
const accessRouter = require("./access");

const router = express.Router();

router.use("/api/user", userRouter); // 注入用户路由模块
router.use("/api/access", accessRouter); // 注入登录、注册路由模块

module.exports = router;
