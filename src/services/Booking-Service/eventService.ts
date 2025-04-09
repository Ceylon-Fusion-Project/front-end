import api from "@/api/axiosInstance"; // Your configured axiosInstance
import type { Event } from "@/components/AdminComponents/BookingComponents/EventManagement";

// Save Event
export const saveEvent = async (event: Omit<Event, "eventId">, idempotencyKey: string) => {
  const response = await api.post("/events/save-event", event, {
    headers: { "X-Idempotency-Key": idempotencyKey },
  });
  return response.data;
};

// Update Event
export const updateEvent = async (eventId: number, event: Omit<Event, "eventId">, idempotencyKey: string) => {
  const response = await api.patch(`/events/update-event-details?id=${eventId}`, event, {
    headers: { "X-Idempotency-Key": idempotencyKey },
  });
  return response.data;
};

// Delete Event
export const deleteEvent = async (eventId: number, idempotencyKey: string) => {
  const response = await api.delete(`/events/delete-event-by-id?id=${eventId}`, {
    headers: { "X-Idempotency-Key": idempotencyKey },
  });
  return response.data;
};

// Get All Events
export const getAllEvents = async () => {
  const response = await api.get("/events/get-all-events");
  return response.data;
};
