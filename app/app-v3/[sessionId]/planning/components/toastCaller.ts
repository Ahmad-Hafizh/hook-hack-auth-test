import { toast } from "sonner";

export function errorToastCaller(error: any) {
  console.log(error);
  toast.error(error.response?.data?.message || "An unknown error occurred", {
    position: "top-center",
  });
}

export function successToastCaller(message: string) {
  toast.success(message, {
    position: "top-center",
  });
}
