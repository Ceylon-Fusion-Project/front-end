import axios from "axios";

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
api.interceptors.response.use(
  (response) => response, // Return response as it is used
  (error) => {
    console.error("API Error:",error);
    Promise.reject(error);
  }   
);

export default api;
