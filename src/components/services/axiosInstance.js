import axios from "axios";

const axiosConfig = {
  baseURL: "/",
};

axios.defaults.withCredentials = false;

export const axiosInstance = axios.create(axiosConfig);
