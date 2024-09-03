import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const TodoList = ({ todos, onEdit, onDelete, onView, inProjectPage }) => {
  const { user } = useAuth();
  const TodoItem = ({ todo, onEdit, onDelete }) => {
    return (
      <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-blue-500 p-4 rounded-lg space-y-2 sm:space-y-0">
        <div className="flex-grow sm:flex sm:items-center sm:space-x-3">
          <button
            onClick={() => onView(todo._id)}
            className="flex-grow text-start outline-none"
          >
            <span className="text-lg text-white">{todo.title}</span>
          </button>
          <span className="text-sm text-white">
            {new Date(todo.createdAt).toLocaleString()}
          </span>
          {inProjectPage && (
            <span className="text-sm text-white mr-2 inline-block">
              {todo?.user?.firstName} {todo?.user?.lastName}
            </span>
          )}
        </div>
        {(todo.user === user._id || user.role === "admin") && (
          <div className="flex items-center space-x-3 ml-3">
            <button
              onClick={() => onEdit(todo._id)}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <FaEdit fontSize={25} />
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="text-red-500 hover:text-red-600"
            >
              <FaTrash fontSize={25} />
            </button>
          </div>
        )}
      </li>
    );
  };

  return (
    <ul className="space-y-4 max-h-52 overflow-auto">
      {todos &&
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </ul>
  );
};

export default TodoList;
