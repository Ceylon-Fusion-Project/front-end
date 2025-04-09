import api from "@/api/axiosInstance";
import { FormValues } from "@/components/AdminComponents/BookingComponents/RoomForm"; // adjust the path as needed

export const saveRoom = async (room: FormValues, idempotencyKey: string) => {
  console.log("IdempotencyKey:", idempotencyKey);
  const response = await api.post(
    "/rooms/save-room",
    room,
    {
      headers: {
        "X-Idempotency-Key": idempotencyKey,
      },
    }
  );
  return response.data;
};

export const updateRoom = async (id: number, room: FormValues, idempotencyKey: string) => {
  console.log("IdempotencyKey:", idempotencyKey);
  const response = await api.patch(
    `/rooms/update-room-details?id=${id}`,
    room,
    {
      headers: {
        "X-Idempotency-Key": idempotencyKey,
      },
    }
  );
  return response.data;
};

export const deleteRoom = async (id: number, idempotencyKey: string) => {
  console.log("IdempotencyKey:", idempotencyKey);
  const response = await api.delete(
    `/rooms/delete-room-by-id?id=${id}`,
    {
      headers: {
        "X-Idempotency-Key": idempotencyKey,
      },
    }
  );
  return response.data;
};

export const getRoomsByAccommodation = async (accommodationId: number) => {
  const response = await api.get("/rooms/get-rooms-by-accommodation-id", {
    params: { id: accommodationId },
  });
  return response.data.data; // assuming the response follows: { message: "...", data: [...] }
};

export const getRoomById = async (roomId: number) => {
  const response = await api.get("/rooms/get-room-details-by-id", {
    params: { id: roomId },
  });
  return response.data.data?.[0]; // list response, so return the first
};

export const getAllRooms = async () => {
    const response = await api.get("/rooms/get-all-rooms");
    return response.data.data || []; // Make sure it matches the structure from your BFF
  };
