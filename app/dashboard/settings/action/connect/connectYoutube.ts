import callApi from "@/config/axios/axios";

export const connectYoutube = async (
  next: string = "/dashboard/settings",
  onRedirect?: (url: string) => void,
) => {
  try {
    const { data } = await callApi.get("/auth/youtube/sign-in");

    if (data.oauth_url) {
      onRedirect?.(data.oauth_url);
    }
  } catch (error: any) {
    console.log(error.response?.data?.url);
    if (error.response?.data?.url) {
      onRedirect?.(error.response.data.url);
    }
  }
};
