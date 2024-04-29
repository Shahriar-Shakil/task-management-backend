const express = require("express");
const UserController = require("../controllers/User");
const validateToken = require("../middleware/validateTokenHadler");
const router = express.Router();

// router.get("/", UserController.findAll);
// router.get("/:email", UserController.findOne);
// // router.post("/", UserController.create);
// router.put("/:id", UserController.update);
// router.delete("/:id", UserController.destroy);

router.post("/register", UserController.register);

router.post("/login", UserController.login);
router.get("/current", validateToken, UserController.currentUser);

module.exports = router;
