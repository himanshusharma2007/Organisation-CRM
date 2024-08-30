import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const logout = async () => {
  await api.get("/auth/logout");
};
export const getUser = async () => {
  try {
    const response = await api.get("/auth/getuser");
    console.log("response :>> ", response);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // User is not authenticated
      return null;
    }
    throw error; // Rethrow other errors
  }
};

export const getAdmin = async () => {
  const response = await api.get("/admin");
  console.log(" get admin response.data :>> ", response.data);
  return response;
};