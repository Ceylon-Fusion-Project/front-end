import api from "@/api/axiosInstance";
import { AccommodationFormValues } from "@/types/accommodation";

interface FilterParams {
    accommodationName?: string;
    accommodationType?: string;
    location?: string;
    isAvailable?: boolean;
    sort?: string;
    page: number;
    size: number;
  }

// SAVE
export const saveAccommodation = async (
  accommodation: AccommodationFormValues,
  idempotencyKey: string
) => {
  const response = await api.post(
    "/accommodation/save-accommodation",
    accommodation,
    {
      headers: {
        "X-Idempotency-Key": idempotencyKey,
      },
    }
  );
  return response.data;
};

// UPDATE
export const updateAccommodation = async (
  id: number,
  accommodation: AccommodationFormValues,
  idempotencyKey: string
) => {
  const response = await api.patch(
    `/accommodation/update-accommodation-details?id=${id}`,
    accommodation,
    {
      headers: {
        "X-Idempotency-Key": idempotencyKey,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// DELETE
export const deleteAccommodation = async (
  id: number,
  idempotencyKey: string
) => {
  const response = await api.delete(
    `/accommodation/delete-accommodation-by-id?id=${id}`,
    {
      headers: {
        "X-Idempotency-Key": idempotencyKey,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// GET BY ID
export const getAccommodationById = async (id: number) => {
  const response = await api.get(
    `/accommodation/get-accommodation-details-by-id?id=${id}`,
    { withCredentials: true }
  );
  return response.data;
};

// GET ALL
export const getAllAccommodations = async (page: number, size: number) => {
    const response = await api.get("/accommodation/get-all-accommodations", {
      params: {
        page,
        size,
      },
      withCredentials: true,
    });
    return response.data;
  };
  

// GET WITH FILTERING
export const getAccommodationsByFilter = async (params: FilterParams) => {
    const response = await api.get("/accommodation/get-accommodation-by-filtering", {
      params,
      withCredentials: true,
    });
    return response.data;
  };

// GET ONLY AVAILABLE ACCOMMODATIONS
export const getAvailableAccommodations = async () => {
    const response = await api.get("/accommodation/get-entire-accommodations", {
      withCredentials: true,
    });
    return response.data;
  };
  