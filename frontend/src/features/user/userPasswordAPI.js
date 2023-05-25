import { axiosPublic, axiosPrivate } from "../../utils/axios";

const API_URL = "password";

const updatePassword = async (userId, data) => {
  const response = await axiosPrivate.patch(`${API_URL}/${userId}`, data);
  return response.data;
};

const forgotPassword = async (data) => {
  const response = await axiosPublic.post(`${API_URL}`, data);
  return response.data;
};

const resetPassword = async (resetToken, data) => {
  const response = await axiosPublic.put(`${API_URL}/${resetToken}`, data);
  return response.data;
};

const passwordAPI = {
  updatePassword,
  forgotPassword,
  resetPassword,
};

export default passwordAPI;
