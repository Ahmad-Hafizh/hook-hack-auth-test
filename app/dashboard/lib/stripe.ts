import callHomeApi from "@/config/axios/axioshome";

const processPayment = async (priceId: string) => {
  const response = await callHomeApi.post("/api/stripe", {
    priceId: priceId,
  });
  if (response.status === 200) {
    window.location.href = response.data.url;
  } else {
    throw new Error("Failed to process payment");
  }
};

export default processPayment;
