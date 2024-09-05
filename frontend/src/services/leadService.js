import api from "./api";

export const getAllLeads = async () => {
  const response = await api.get("/leads");
  return response.data;
};

export const getLeadById = async (id) => {
  const response = await api.get(`/leads/lead-details/${id}`);
  return response.data;
};
export const getUserLeads = async (id) => {
  const response = await api.get(`/leads/user-leads`);
  return response.data;
};

export const createLead = async (leadData) => {
  const response = await api.post("/leads", leadData);
  return response.data;
};

export const updateLead = async (id, leadData) => {
  const response = await api.post(`/leads/update-lead/${id}`, leadData);
  console.log('response.data in update lead:>> ', response.data);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};
