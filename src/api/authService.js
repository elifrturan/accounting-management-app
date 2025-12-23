import axiosInstance from "./axiosInstance";

export const register = (registerData) => {
  return axiosInstance.post("/auth/register", registerData);
};
