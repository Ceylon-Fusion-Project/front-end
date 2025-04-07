import axios from "axios";
import { handleAxiosError } from "@/api/handleAxiosError";
import type { AxiosError } from "axios";
import type { CustomAxiosRequestConfig } from "@/api/customAxios";

const api = axios.create({
  baseURL: "https://localhost:3001/api/v1",
  //timeout: 5000, // Set a timeout of 5 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

//Response Interceptor for Error Handling
// api.interceptors.response.use(
//   (response) => response, // Return response as it is used
//   (error) => {
//     console.error("API Error:",error);
//     handleAxiosError(error as AxiosError);
//     Promise.reject(error);
//   }   
// );
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config as CustomAxiosRequestConfig; // 👈 Cast here
    if (!config?.suppressGlobalError) {
      handleAxiosError(error as AxiosError);
    }
    return Promise.reject(error);
  }
);

export default api;

