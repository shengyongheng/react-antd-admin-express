const express = require("express");
const userController = require("../controllers/users");

const router = express.Router();

router.get("/list", userController.getUserslist);
router.delete("/delete", userController.deleteUsers);
router.get("/detail", userController.getUsersDetail);
router.post("/add", userController.addUsers);
router.post("/update", userController.updateUsers);

module.exports = router;
