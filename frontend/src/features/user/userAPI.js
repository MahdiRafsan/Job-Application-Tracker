import { axiosPrivate } from "../../utils/axios";

const API_URL = "user";

const getAllUsers = async () => {
  const response = await axiosPrivate.get(API_URL);
  return response.data;
};

const getAUser = async (userId) => {
  const response = await axiosPrivate.get(`${API_URL}/${userId}`);
  return response.data;
};

const updateAUser = async (userId, userData) => {
  const response = await axiosPrivate.patch(`${API_URL}/${userId}`, userData);
  return response.data;
};

const deleteAUser = async (userId) => {
  const response = await axiosPrivate.delete(`${API_URL}/${userId}`);
  return response.data;
};

const userAPI = {
  getAllUsers,
  getAUser,
  updateAUser,
  deleteAUser,
};

export default userAPI;
