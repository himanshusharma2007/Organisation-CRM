import React, { useState, useEffect } from "react";
import {
  getAllUserTodos,
  editUserTodo,
  deleteUserTodo,
} from "../services/adminService";

const AdminDashboard = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getAllUserTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleEdit = async (todo) => {
    setEditingTodo(todo);
  };

  const handleSave = async (id, updatedTodo) => {
    try {
      await editUserTodo(id, updatedTodo);
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td className="py-2 px-4 border-b">
                {editingTodo && editingTodo._id === todo._id ? (
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) =>
                      setEditingTodo({ ...editingTodo, title: e.target.value })
                    }
                  />
                ) : (
                  todo.title
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingTodo && editingTodo._id === todo._id ? (
                  <input
                    type="text"
                    value={editingTodo.description}
                    onChange={(e) =>
                      setEditingTodo({
                        ...editingTodo,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  todo.description
                )}
              </td>
              <td className="py-2 px-4 border-b">{todo.user.userName}</td>
              <td className="py-2 px-4 border-b">
                {editingTodo && editingTodo._id === todo._id ? (
                  <button onClick={() => handleSave(todo._id, editingTodo)}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(todo)}>Edit</button>
                )}
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
