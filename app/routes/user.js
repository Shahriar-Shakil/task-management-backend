const express = require("express");
const UserController = require("../controllers/User");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);
router.get("/current", validateToken, UserController.currentUser);
router.get("/logout", validateToken, UserController.logout);

module.exports = router;
