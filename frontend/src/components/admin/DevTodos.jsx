import React, { useState, useEffect } from "react";
import {
  getAllUserTodos,
  editUserTodo,
  deleteUserTodo,
} from "../../services/adminService";
import { useParams } from "react-router-dom";
import Modal from "../UI/Modal";

const DevTodos = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleView = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedTodo) => {
    try {
      await editUserTodo(updatedTodo._id, updatedTodo);
      setTodos(
        todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
      setIsModalOpen(false);
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

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
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
                      {truncateText(todo.title, 10)}
                    </td>
                    <td className="py-3 px-4">
                      {truncateText(todo.description, 10)}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(todo.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(todo)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
                        >
                          View
                        </button>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="View/Edit Todo"
      >
        {selectedTodo && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(selectedTodo);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={selectedTodo.title}
                onChange={(e) =>
                  setSelectedTodo({ ...selectedTodo, title: e.target.value })
                }
                className="w-full bg-gray-700 text-white px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                value={selectedTodo.description}
                onChange={(e) =>
                  setSelectedTodo({
                    ...selectedTodo,
                    description: e.target.value,
                  })
                }
                className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DevTodos;
