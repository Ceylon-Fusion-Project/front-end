import api from "@/api/axiosInstance"; // Your configured Axios instance

// Save experience center
export const saveExperienceCenter = (data: any, idempotencyKey: string) =>
  api.post("/experience/save-experience", data, {
    headers: {
      "X-Idempotency-Key": idempotencyKey,
    },
  });

// Get all paginated experience centers
export const getAllExperienceCenters = (page: number, size: number) =>
  api.get("/experience/get-all-experiences", {
    params: { page, size },
  });

// Update experience center
export const updateExperienceCenter = (
  id: number,
  data: any,
  idempotencyKey: string
) =>
  api.patch("/experience/update-experience-details", data, {
    params: { id },
    headers: {
      "X-Idempotency-Key": idempotencyKey,
    },
  });

// Delete experience center
export const deleteExperienceCenter = (id: number, idempotencyKey: string) =>
  api.delete("/experience/delete-experience-by-id", {
    params: { id },
    headers: {
      "X-Idempotency-Key": idempotencyKey,
    },
  });
