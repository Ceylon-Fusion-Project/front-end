import { toast } from "sonner";

const NotificationService = {
    success: (message: string) =>
        toast.success(message, {
            duration: 4000,
            className: "bg-green-100 text-green-800 shadow-lg",
        }),

    error: (message: string) =>
        toast.error(message, {
            duration: 5000,
            className: "bg-red-100 text-red-800 shadow-lg",
        }),

    info: (message: string) =>
        toast(message, {
            duration: 3000,
            className: "bg-blue-100 text-blue-800 shadow-lg",
        }),

    warning: (message: string) =>
        toast.warning(message, {
            duration: 3000,
            className: "bg-yellow-100 text-yellow-800 shadow-lg",
        }),
}

export default NotificationService;