import api from "./api";

export const getAllTodos = async () => {
  const response = await api.get("/todo");
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await api.post("/todo/create", todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await api.post(`/todo/edit/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.get(`/todo/delete/${id}`);
  return response.data;
};
