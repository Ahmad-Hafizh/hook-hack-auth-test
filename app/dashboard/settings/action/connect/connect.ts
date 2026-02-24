import callApi from "@/config/axios/axios";
import { redirect } from "next/navigation";

export const connectGoogleAds = async () => {
  try {
    const { data } = await callApi.get("/auth/google-ads/sign-in");

    if (data.url) {
      console.log(data.url);
      const formated = data.url.startsWith("https://hook-hack.com")
        ? data.url.replace(
            "https://hook-hack.com",
            process.env.NEXT_PUBLIC_APP_URL!,
          )
        : data.url;

      redirect(formated);
    }
  } catch (error: any) {
    console.log(error.response.data.url);
    if (error.response.data.url) {
      redirect(error.response.data.url);
    }
  }
};
