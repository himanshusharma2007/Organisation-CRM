import React, { useState, useEffect } from "react";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";
import AddTodoForm from "../components/Todo/AddTodoForm";
import TodoList from "../components/Todo/TodoList";
import EditTodoModal from "../components/Todo/EditTodoModal";
import ViewTodoModal from "../components/Todo/ViewTodoModal";

import { getAllProjects, getUserProjects } from "../services/projectService";
import { useAuth } from "../context/AuthContext";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [viewTodo, setViewTodo] = useState(null);
  const [projects, setProjects] = useState([]);
  const {user}=useAuth()
  // const {user}=useAuth();
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await getAllTodos();
       const data =
         user?.role === "admin"
           ? await getAllProjects()
           : await getUserProjects();
       setProjects(data);
      setTodos(fetchedTodos);
      console.log('data :>> ', data);
      console.log('fetchTodos :>> ', fetchTodos);
    } catch (err) {
      console.log('err :>> ', err);
      setError("Failed to fetch todos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
     
      const newTodo = await createTodo(todoData);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const handleEditTodo = (todoId) => {
    const todoToEdit = todos.find((todo) => todo._id === todoId);
    setEditingTodo(todoToEdit);
  };
  const handleViewTodo = (todoId) => {
    console.log("handleViewTodo called todoId :>> ", todoId);
    setViewTodo(todos.find((todo) => todo._id === todoId));
  };

  const handleUpdateTodo = async (todoId, todoData) => {
    try {
      const updatedTodo = await updateTodo(todoId, todoData);
      setTodos(todos.map((todo) => (todo._id === todoId ? updatedTodo : todo)));
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col  items-center w-full  ">
      <div className=" md:w-[60vw] mt-10">
        <h1 className="text-3xl font-bold mb-6">Add Task/Update</h1>
        <AddTodoForm onAdd={handleAddTodo} projects={projects} />
        <TodoList
          todos={todos}
          onEdit={handleEditTodo}
          onView={handleViewTodo}
          onDelete={handleDeleteTodo}
        />
        <EditTodoModal
          isOpen={!!editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={handleUpdateTodo}
          todo={editingTodo}
        />
        <ViewTodoModal
          isOpen={!!viewTodo}
          onClose={() => setViewTodo(null)}
          todo={viewTodo}
        />
      </div>
    </div>
  );
};

export default TodosPage;
