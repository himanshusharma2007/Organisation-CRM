const Todo = require("../models/todoModel");
const User = require("../models/userModel");

exports.getAllUserTodos = async (req, res) => {
  try {
    console.log("getAllUserTodos called")
    const {id}=req.params;
    const todos = await Todo.find({user:id}).populate("user");
    res.status(200).json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    console.log("getAllUser called")
    const users = await User.find();
    console.log('users :>> ', users);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

exports.editUserTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating todo", error: error.message });
  }
};

exports.deleteUserTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id  in delete todo:>> ', id);
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting todo", error: error.message });
  }
};
