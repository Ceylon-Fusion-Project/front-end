// src/utils/handleAxiosError.ts
import { AxiosError } from "axios";
import NotificationService from "@/utils/NotificationService";

// Safe error handler
export const handleAxiosError = (error: AxiosError) => {
  console.error("API Error123:", error);

  const status = error.response?.status;
  const data = error.response?.data as { error?: string; message?: string } | undefined;
  const message = data?.error || data?.message || error.message || "Unexpected error occurred.";

  if (status) {
    switch (status) {
      case 400:
        NotificationService.error(`Bad Request: ${message}`);
        break;
      case 401:
        NotificationService.error(`Unauthorized: ${message}`);
        break;
      case 403:
        NotificationService.error(`Forbidden: ${message}`);
        break;
      case 404:
        NotificationService.error(`Not Found: ${message}`);
        break;
      case 409:
        NotificationService.error(`Conflict: ${message}`);
        break;
      case 500:
        NotificationService.error(`Server Error: ${message}`);
        break;
      default:
        NotificationService.error(`Error (${status}): ${message}`);
        break;
    }
  } else if (error.request) {
    NotificationService.error("No response from server. Check your internet connection.");
  } else {
    NotificationService.error(`Request error: ${message}`);
  }
};

// import { AxiosError } from "axios";
// import NotificationService from "@/utils/NotificationService";

// // Type guard to make sure it's AxiosError
// function isAxiosError(error: any): error is AxiosError {
//   return !!(error?.isAxiosError && error?.response);
// }

// export const handleAxiosError = (error: unknown) => {
//   console.error("API Error123:", error);

//   if (isAxiosError(error)) {
//     const status = error.response?.status;
//     const data = error.response?.data as { error?: string; message?: string } | undefined;

//     const message =
//       (typeof data === "object" && (data?.error || data?.message)) ||
//       error.message ||
//       "Unexpected error occurred.";

//     switch (status) {
//       case 400:
//         NotificationService.error(`Bad Request: ${message}`);
//         break;
//       case 401:
//         NotificationService.error(`Unauthorized: ${message}`);
//         break;
//       case 403:
//         NotificationService.error(`Forbidden: ${message}`);
//         break;
//       case 404:
//         NotificationService.error(`Not Found: ${message}`);
//         break;
//       case 409:
//         NotificationService.error(`Conflict: ${message}`);
//         break;
//       case 500:
//         NotificationService.error(`Server Error: ${message}`);
//         break;
//       default:
//         NotificationService.error(`Error (${status}): ${message}`);
//         break;
//     }
//   } else {
//     NotificationService.error("Unexpected error occurred.");
//   }
// };
