import api from "./api";

export const getEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};
