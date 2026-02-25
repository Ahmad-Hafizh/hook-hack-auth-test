import callApi from "@/config/axios/axios";
import { redirect } from "next/navigation";

export const connectMCC = async (
  next: string = "/dashboard/settings",
  onRedirect?: (url: string) => void,
) => {
  try {
    const { data } = await callApi.get("/auth/google-ads/mcc/link", {
      params: {
        next,
      },
    });

    if (data.url) {
      onRedirect?.(data.url);
      redirect(data.url);
    }
  } catch (error: any) {
    console.log(error.response.data.url);
    if (error.response.data.url) {
      onRedirect?.(error.response.data.url);
      redirect(error.response.data.url);
    }
  }
};
