const express = require("express");
const accessController = require("../controllers/access");

const router = express.Router();

router.post("/register", accessController.register);
router.post("/login", accessController.login);

module.exports = router;
/**
 * INSERT INTO access_table (`username`, `password`) VALUES ('hengshengyong','Hsyasd123');

   CREATE TABLE `access_table` (
     `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
     `username` varchar(255) NOT NULL,
     `password` varchar(255) NOT NULL,
     `userType` varchar(255) NOT NULL
   );
*/