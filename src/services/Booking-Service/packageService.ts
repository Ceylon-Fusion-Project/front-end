import api from "@/api/axiosInstance";

// Reuse Room and Event if shared globally, otherwise define here
export interface Room {
  roomId: number;
  roomCode: string;
  roomNumber: string;
  roomType: string;
  beds: number;
  pricePerNight: number;
  accommodationId: number;
  roomImageURLs: string[];
}

export interface Event {
  eventId: number;
  eventName: string;
  eventDescription: string;
  pricePerEvent: number;
  startTime: string;
  endTime: string;
  experienceId: number;
  eventImageURLs: string[];
  isAvailable: boolean;
}

export interface Package {
  packageId: number;
  packageName: string;
  description: string;
  pricePerDay: number;
  isPredefined: boolean;
  packageRatingValue: number;
  createdAt: string;
  updatedAt: string;
  events: Event[];
  rooms: Room[];
}

// ✅ Define the missing interfaces
export interface SavePackageInput {
  packageCode: string;
  packageName: string;
  description: string;
  pricePerDay: number;
  roomIds: number[];
  eventIds: number[];
  predefined: boolean;
}

export interface UpdatePackageInput {
  packageName: string;
  description: string;
  pricePerDay: number;
  roomIds: number[];
  eventIds: number[];
  predefined: boolean;
}

// Create Package
export const savePackage = async (pkg: SavePackageInput, idempotencyKey: string) => {
  return api.post("/packages/save-package", pkg, {
    headers: { "X-Idempotency-Key": idempotencyKey },
  });
};

// Update Package
export const updatePackage = async (packageId: number, pkg: UpdatePackageInput, idempotencyKey: string) => {
  return api.patch(`/packages/update-package-details?id=${packageId}`, pkg, {
    headers: { "X-Idempotency-Key": idempotencyKey },
  });
};

// Delete Package
export const deletePackage = async (packageId: number, idempotencyKey: string) => {
  const response = await api.delete(`/packages/delete-package-by-id?id=${packageId}`, {
    headers: {
      "X-Idempotency-Key": idempotencyKey,
    },
  });
  return response.data;
};

// Get All Packages
export const getAllPackages = async () => {
  const response = await api.get("/packages/get-all-packages");
  return response.data.data || [];
};

// Get Package by ID
export const getPackageById = async (packageId: number) => {
  const response = await api.get("/packages/get-package-details-by-id", {
    params: { id: packageId },
  });
  return response.data.data?.[0];
};
