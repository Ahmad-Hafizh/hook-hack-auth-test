import callApi from "@/config/axios/axios";

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
    }
  } catch (error: any) {
    console.log(error.response?.data?.url);
    if (error.response?.data?.url) {
      onRedirect?.(error.response.data.url);
    }
  }
};
