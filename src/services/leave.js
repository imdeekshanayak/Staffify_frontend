import api from "./api";


export const getLeaves = async () => {
  const res = await api.get("/getLeaves");
  return res.data;
};

export const getLeaveById = async (id) => {
  const res = await api.get(`/getLeave/:id/${id}`);
  return res.data;
};


export const createLeave = async (leaveData) => {
  const res = await api.post("/createLeave", leaveData);
  return res.data;
};

export const updateLeave = async (id, leaveData) => {
  const res = await api.put(`/updateLeave/${id}`, leaveData);
  return res.data;
};

export const deleteLeave = async (id) => {
  const res = await api.delete(`/deleteLeave/${id}`);
  return res.data;
};
