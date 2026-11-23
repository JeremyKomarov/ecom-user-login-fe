import { axiosInstance as axios } from "./axiosInstance";

const CREATE_USER = () => "/api/public/user/create";
const AUTHENTICATE = () => "/api/public/authenticate";
const TEST_API_1 = () => "/api/public/test1";
const PROFILE = () => "/api/profile";

export const createUser = (userBody) => {
  return axios.post(CREATE_USER(), userBody);
};

export const authenticate = (userBody) => {
  return axios.post(AUTHENTICATE(), userBody);
};

export const testApiRoute1 = (params) => {
  return axios.get(TEST_API_1(), { headers: params });
};

export const getProfile = (params) => {
  return axios.get(PROFILE(), { headers: params });
};
