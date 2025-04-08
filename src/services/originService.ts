import api from "@/api/axiosInstance";

export interface OriginFormData {
  originID?: number;
  stateLocation: string;
  stateMapLink: string;
  partOfPlant: string;
  originDescription: string;
  factoryName: string;
  factoryAddress: string;
  factoryMapLink: string;
  demoVideoLink: string;
  originCode: string;
}

// Save origin
export const saveOrigin = async (
  data: OriginFormData,
  IdempotencyKey: string
) => {
  const response = await api.post("/origin/save-origin", data, {
    headers: {
      "X-Idempotency-Key": IdempotencyKey,
    },
  });
  return response.data;
};

// Update origin
export const updateOrigin = async (
  originID: number,
  data: OriginFormData,
  IdempotencyKey: string
) => {
  const response = await api.patch(`/origin/update-origin`, data, {
    headers: {
      "X-Idempotency-Key": IdempotencyKey,
    },
    params: { originID },
  });
  return response.data;
};

// Delete origin
export const deleteOrigin = async (
  originID: number,
  IdempotencyKey: string
) => {
  const response = await api.delete(`/origin/delete-origin-by-id`, {
    headers: {
      "X-Idempotency-Key": IdempotencyKey,
    },
    params: { originID },
  });
  return response.data;
};

// Get origin by ID (optional for fetch usage)
export const getOriginById = async (originID: number) => {
  const response = await api.get(
    `/origin/get-origin-by-id?originID=${originID}`
  );
  return response.data;
};

// Get all origins
export const getAllOrigins = async (page = 0, size = 10) => {
  const response = await api.get("/origin/get-all-origins", {
    params: { page, size },
  });
  return response.data;
};

// Get origins with filtering
export const getOriginsByFilter = async (filters: any, page = 0, size = 10) => {
  const response = await api.get("/origin/get-origins-by-filtering", {
    params: { ...filters, page, size },
  });
  return response.data;
};
