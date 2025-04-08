// import api from "@/api/axiosInstance";

// export const getUserID = async () => {
//     const response = await api.get("/user/get-user-by-cfId",);
//     console.log("User ID:", response.data);
//     return response.data;
//   };

import api from "@/api/axiosInstance";
import type { CustomAxiosRequestConfig } from "@/api/customAxios"; // 👈 Import custom type

export const getUserID = async () => {
  const config: CustomAxiosRequestConfig = {
    suppressGlobalError: true,
  };

  const response = await api.get("/user/get-user-by-cfId", config);
  console.log("User ID:", response.data);
  return response.data;
};
