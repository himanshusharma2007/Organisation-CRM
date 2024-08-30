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
  console.log("id :>> ", id);
  useEffect(() => {
    fetchTodos(id);
  }, []);

  const fetchTodos = async (id) => {
    try {
      const response = await getAllUserTodos(id);
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
     setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    //   fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      {todos.length == 0 ? (
        <div>no todo saved yet by this developer </div>
      ) : (
        <>
          <div>
            {" "}
            <span>
              {todos[0].user.firstName} {todos[0].user.lastName}
            </span>
          </div>

          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">created At</th>
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
                          setEditingTodo({
                            ...editingTodo,
                            title: e.target.value,
                          })
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
                  <td className="py-2 px-4 border-b">{todo.createdAt}</td>
                  <td className="flex space-x-2 py-2 px-4 border-b">
                    {editingTodo && editingTodo._id === todo._id ? (
                      <button onClick={() => handleSave(todo._id, editingTodo)}>
                        Save
                      </button>
                    ) : (
                      <button
                        className="px-2 py-1  rounded-lg text-white  bg-yellow-500 text-md "
                        onClick={() => handleEdit(todo)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="px-2 py-1 rounded-lg text-white  bg-red-500 text-md "
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DevTodos;
