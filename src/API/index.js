import axios from "axios";

const REACT_APP_BACKEND_URL = "http://localhost:8000/api/";

export function createClient(config) {
  return axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    responseType: "json",
  });
}

export const ApiClient = createClient();

ApiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken && accessToken !== "null") {
      config.headers.Authorization = `Token ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (e) => Promise.reject(e)
);
