import axios from "axios";

const API_URL = "/api/v1/auth";

const registerUser = async (formData) => {
  const response = await axios.post(API_URL + '/register', formData);
  if (response.data) {
    localStorage.setItem("token", response.data.accessToken);
  }
  return response.data;
};

const loginUser = async (formData) => {
  const response = await axios.post(`${API_URL}/login`, formData);
  if (response.data) {
    localStorage.setItem("token", response.data.accessToken);
  }
  return response.data;
};

const logoutUser = () => {
  localStorage.remove("token");
};

const authAPI = { registerUser, loginUser, logoutUser };

export default authAPI;
