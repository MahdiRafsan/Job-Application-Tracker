import { axiosPrivate } from "../../utils/axios";

const API_URL = "/job";
const getAllJobs = async (queryString) => {
  const response = await axiosPrivate.get(`${API_URL}?${queryString}`);
  return response.data;
};

const getAJob = async (jobId) => {
  const response = await axiosPrivate.get(`${API_URL}/${jobId}`);
  return response.data;
};

const createAJob = async (jobData) => {
  const response = await axiosPrivate.post(API_URL, jobData);
  return response.data;
};

const updateAJob = async (jobId, jobData) => {
  const response = await axiosPrivate.patch(`${API_URL}/${jobId}`, jobData);
  return response.data;
};

const deleteAJob = async (jobId) => {
  const response = await axiosPrivate.delete(`${API_URL}/${jobId}`);
  return response.data;
};

const getJobStats = async () => {
  const response = await axiosPrivate.get(`${API_URL}/stats/all`)
  return response.data
}
const jobAPI = {
  getAllJobs,
  getAJob,
  createAJob,
  updateAJob,
  deleteAJob,
  getJobStats
};

export default jobAPI;
