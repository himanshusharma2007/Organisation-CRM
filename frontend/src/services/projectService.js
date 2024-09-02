import api from "./api";

export const getAllProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const getUserProjects = async () => {
  const response = await api.get("/projects/user");
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  console.log('response.data :>> ', response.data);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post("/projects/create-project", projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await api.post(`/projects/update-project/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/delete-project/${id}`);
  return response.data;
};
