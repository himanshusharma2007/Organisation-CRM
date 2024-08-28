const express = require("express");
const router = express.Router();
const {
  getAllUserTodos,
  editUserTodo,
  deleteUserTodo,
} = require("../controllers/adminController");
const { protectRoute, adminOnly } = require("../middleware");

router.use(protectRoute);
router.use(adminOnly);

router.get("/todos", getAllUserTodos);
router.put("/todos/:id", editUserTodo);
router.delete("/todos/:id", deleteUserTodo);

module.exports = router;
