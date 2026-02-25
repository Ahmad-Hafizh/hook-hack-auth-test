import callApi from "@/config/axios/axios";
import { redirect } from "next/navigation";

export const connectGoogleAds = async (
  next: string = "/dashboard/settings",
  onRedirect?: (url: string) => void,
) => {
  try {
    const { data } = await callApi.get("/auth/google-ads/sign-in", {
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
