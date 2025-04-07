import api from "@/api/axiosInstance";

export const getUserID = async () => {
    const response = await api.get("/user/get-user-by-cfId");
    return response.data;
    console.log("User ID:", response.data);
  };