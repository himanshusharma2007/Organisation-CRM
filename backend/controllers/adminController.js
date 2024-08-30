const Todo = require("../models/todoModel");
const User = require("../models/userModel");

exports.getAllUserTodos = async (req, res) => {
  try {
    console.log("getAllUserTodos called")
    const {id}=req.params;
    console.log('id :>> ', id);
   const todos = await Todo.find({ user: id });
  console.log('todos :>> ', todos);
    // Check if todos array is empty
    if (todos.length === 0) {
      console.log("check")
      return res.status(204).json({});
    }

    // If todos exist, then populate the user field
    const populatedTodos = await Todo.populate(todos, { path: "user" });

    console.log('todos :>> ', populatedTodos);
    res.status(200).json(populatedTodos);
  } catch (error) {
    console.log('error.message :>> ', error.message);
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
   console.log('todo deleted  :>> ');
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting todo", error: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete all todos associated with the user
    await Todo.deleteMany({ user: id });

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User and associated todos deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting User", error: error.message });
  }
};

exports.editUserName = async (req, res) => {
  try {
    console.log("edit user name called")
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating User name", error: error.message });
  }
};