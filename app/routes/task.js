const express = require("express");
const TaskController = require("../controllers/Task");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);

router.get("/", TaskController.findAll);
router.get("/:id", TaskController.findOne);
router.post("/", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/delete", TaskController.destroy);

module.exports = router;
