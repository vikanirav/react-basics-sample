//Dependencies
import axios from "axios";

const axiosInterceptors = axios.create({
  baseURL: "https://localhost:7184/api/",
});

axiosInterceptors.interceptors.request.use(async (config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers["accept"] = "application/json";
  // config.headers['User-Email'] = JSON.parse(
  //   localStorage.getItem(messageConstants.OktaTokenStorage)
  // )?.idToken?.claims?.email;
  // config.headers['User-Mhf'] = JSON.parse(
  //   localStorage.getItem(messageConstants.OktaTokenStorage)
  // )?.idToken?.claims?.UserId;
  return config;
});

axiosInterceptors.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let errorMessage;

    if (typeof error === "string") {
      errorMessage = error;
    } else {
      if (error?.response && error?.response.data) {
        errorMessage =
          error.response.data?.Message ?? error.response.data?.message;
      } else if (error?.response && error?.response.data?.errors) {
        for (const key in error.response.data.errors) {
          errorMessage = `${errorMessage ? `${errorMessage}, ` : ""}${key}: ${
            error.response.data.errors[key]
          }`;
        }
      } else {
        errorMessage = error.message;
      }
    }
    return Promise.reject(errorMessage);
  }
);

export const httpService = {
  //This is common get api request.
  async Get(path) {
    const result = await axiosInterceptors.get(path);
    return result;
  },

  //This is common post api request.
  async Post(path, data) {
    const result = await axiosInterceptors.post(path, data);
    return result;
  },

  //This is common put api request.
  async Put(path, data) {
    const result = await axiosInterceptors.put(path, data);
    return result;
  },

  //This is common delete api request.
  async Delete(path) {
    const result = await axiosInterceptors.delete(path);
    return result;
  },
};
