import axios from "axios";

const API_URL = "/api/admin";

export const getAllUserTodos = () => {
  return axios.get(`${API_URL}/todos`);
};

export const editUserTodo = (id, updatedTodo) => {
  return axios.put(`${API_URL}/todos/${id}`, updatedTodo);
};

export const deleteUserTodo = (id) => {
  return axios.delete(`${API_URL}/todos/${id}`);
};
