import { axiosPrivate, axiosPublic } from "../../utils/axios";

const API_URL = "/auth";

const registerUser = async (formData) => {
  const response = await axiosPublic.post(`${API_URL}/register`, formData);
  return response.data;
};

const loginUser = async (formData) => {
  const response = await axiosPublic.post(`${API_URL}/login`, formData);
  return response.data;
};

const refreshAccessToken = async () => {
  const response = await axiosPublic.get(`${API_URL}/refresh`);
  return response.data;
};

const logoutUser = async () => {
  const response = await axiosPrivate.delete(`${API_URL}/logout`)
  return response
};

const authAPI = { registerUser, loginUser, refreshAccessToken, logoutUser };

export default authAPI;
