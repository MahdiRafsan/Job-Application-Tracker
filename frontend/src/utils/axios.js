import axios from "axios";
import { store } from "../app/store";
import { refresh } from "../features/auth/authSlice";

const BASE_URL = "https://job-trek-api.onrender.com";

let refreshing = null;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const refreshToken = async () => {
  return await store.dispatch(refresh());
};

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${
        store?.getState()?.auth?.userToken
      }`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalReq = error?.config;
    console.log(originalReq);
    if (
      error.response &&
      error.response.status === 401 &&
      !originalReq._retry
    ) {
      originalReq._retry = true;
      refreshing = refreshing ? refreshing : refreshToken();
      let res = await refreshing;
      // flag to avoid requesting multiple tokens in case multiple api calls
      // from same component (e.g. Dashboard)
      refreshing = null;
      if (res?.payload?.accessToken) {
        originalReq.headers["Authorization"] = `Bearer ${
          store?.getState()?.auth?.userToken
        }`;
        return axiosPrivate(originalReq);
      }
    }

    return Promise.reject(error);
  }
);
