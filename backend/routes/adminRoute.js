const express = require("express");
const router = express.Router();
const {
  getAllUserTodos,
  editUserTodo,
  deleteUserTodo,
} = require("../controllers/adminController");
const  protectRoute  = require("../middleware/protectRoute");
const { adminOnly } = require("../middleware/protectAdminRotute");

router.use(protectRoute);
router.use(adminOnly);

router.get("/todos", getAllUserTodos);
router.post("/todos/:id", editUserTodo);
router.delete("/todos/:id", deleteUserTodo);

module.exports = router;
