import axiosInstance from "../utils/axiosInstance.js";

export const loginUser = async (name, password) => {
  const { data } = await axiosInstance.post("/api/auth/login", {
    name,
    password,
  });
  return data;
};
export const registerUser = async (name, email, password) => {
  const { data } = await axiosInstance.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return data;
};
export const logOut = async () => {
  const { data } = await axiosInstance.get("/api/auth/logout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/api/auth/me");
  return data;
};
