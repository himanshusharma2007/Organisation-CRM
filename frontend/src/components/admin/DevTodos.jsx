import React, { useState, useEffect } from "react";
import {
  getAllUserTodos,
  editUserTodo,
  deleteUserTodo,
} from "../../services/adminService";
import { useParams } from "react-router-dom";

const DevTodos = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchTodos(id);
  }, [id]);

  const fetchTodos = async (id) => {
    try {
      const response = await getAllUserTodos(id);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleSave = async (id, updatedTodo) => {
    try {
      await editUserTodo(id, updatedTodo);
      setEditingTodo(null);
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {todos.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No todos saved yet by this developer
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">
            Todos for {todos[0].user.firstName} {todos[0].user.lastName}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Created At</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo._id} className="border-b border-gray-700">
                    <td className="py-3 px-4">
                      {editingTodo && editingTodo._id === todo._id ? (
                        <input
                          type="text"
                          value={editingTodo.title}
                          onChange={(e) =>
                            setEditingTodo({
                              ...editingTodo,
                              title: e.target.value,
                            })
                          }
                          className="bg-gray-700 text-white px-2 py-1 rounded"
                        />
                      ) : (
                        todo.title
                      )}
                    </td>
                    <td className="py-3 px-4">
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
                          className="bg-gray-700 text-white px-2 py-1 rounded"
                        />
                      ) : (
                        todo.description
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(todo.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {editingTodo && editingTodo._id === todo._id ? (
                          <button
                            onClick={() => handleSave(todo._id, editingTodo)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-200"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(todo)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition duration-200"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(todo._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DevTodos;
