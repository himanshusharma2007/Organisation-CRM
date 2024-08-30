import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TodoList = ({ todos, onEdit, onDelete, onView }) => {
  const TodoItem = ({ todo, onEdit, onDelete }) => {
    return (
      <li className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => onView(todo._id)}
          className="flex-grow items-center outline-none text-start"
        >
          <span
            className="text-lg   text-white
              "
          >
            {todo.title}
          </span>
        </button>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onEdit(todo._id)}
            className=" text-blue-500 hover:text-blue-600 mr-2"
          >
            <FaEdit fontSize={25}/>
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className=" text-red-500 hover:text-red-600"
          >
            <FaTrash fontSize={25}/>
          </button>
        </div>
      </li>
    );
  };
  return (
    <ul className="space-y-4 max-h-40 overflow-auto ">
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
