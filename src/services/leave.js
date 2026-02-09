import api from "./api";

export const getLeaves = async () => {
  const res = await api.get("/leaves");
  return res.data;
};
