import callAppV2Api from "@/config/axios/axiosAppV2";
import callApi from "@/config/axios/axios";
import { redirect } from "next/navigation";

export const submitStep1 = async ({
  setLoading,
  onNext,
  budget,
  onSetPlan,
  sessionId,
}: {
  setLoading: (loading: boolean) => void;
  onNext: () => void;
  budget: number;
  onSetPlan: any;
  sessionId: string;
}) => {
  setLoading(true);
  try {
    const { data } = await callApi.post("/app-v2/planning/how/step1", {
      budget,
      sessionId,
    });

    onSetPlan(data.plan);
    onNext();
  } catch (error) {
    const { status, statusText } = (error as any).response || {};
    if (status == 401 && statusText == "invalid") {
      redirect("/app-v2/planning/what");
    } else {
      console.error("Error submitting Step 1:", error);
    }
  } finally {
    setLoading(false);
  }
};

export const submitStep2 = async ({
  setLoading,
  onNext,
  selectedTemplateId,
  sessionId,
  onSetJobId,
}: {
  setLoading: (loading: boolean) => void;
  onNext: () => void;
  selectedTemplateId: string;
  sessionId: string;
  onSetJobId: (jobId: string) => void;
}) => {
  setLoading(true);
  try {
    const { data } = await callApi.post("/app-v2/planning/how/step2", {
      template_id: selectedTemplateId,
      sessionId,
    });

    onSetJobId(data.job_id);
    onNext();
  } catch (error) {
    const { status, statusText } = (error as any).response || {};
    if (status == 401 && statusText == "invalid") {
      redirect("/app-v2/planning/what");
    } else {
      console.error("Error submitting Step 2:", error);
    }
  } finally {
    setLoading(false);
  }
};

export const getJobResult = async ({
  jobId,
  sessionId,
}: {
  jobId: string;
  sessionId: string;
}) => {
  try {
    const { data } = await callApi.post("/app-v2/planning/how/step3/variants", {
      job_id: jobId,
      sessionId,
    });

    return data;
  } catch (error) {
    console.error("getJobResult error:", error);
    return { status: "error", error: error };
  }
};

export const submitStep3 = async ({
  setLoading,
  onNext,
}: {
  setLoading: (loading: boolean) => void;
  onNext: () => void;
}) => {
  setLoading(true);
  try {
    setTimeout(() => {}, 1000);
    console.log("called");
    onNext();
  } catch (error) {
    const { status, statusText } = (error as any).response || {};
    if (status == 401 && statusText == "invalid") {
      redirect("/app-v2/planning/what");
    } else {
      console.error("Error submitting Step 3:", error);
    }
  } finally {
    setLoading(false);
  }
};

export const submitStep4 = async ({
  setLoading,
  onNext,
  patternCombinations,
  brandLogoUrl,
  bgm,
  sessionId,
}: {
  setLoading: (loading: boolean) => void;
  onNext: () => void;
  patternCombinations: any[];
  brandLogoUrl: string | null;
  bgm: string;
  sessionId: string;
}) => {
  setLoading(true);
  try {
    const newPatternsCombation = patternCombinations.map((pattern) => {
      return {
        ...pattern,
        images: {
          ...pattern.images,
          logo: brandLogoUrl || "https://example.com/default-logo.png",
        },
        bgm,
      };
    });

    await callApi.post("/app-v2/planning/how/step4", {
      sessionId,
      patternCombinations: newPatternsCombation,
    });

    // onSetRendersCreatomate(data.renders);
    onNext();
  } catch (error) {
    const { status, statusText } = (error as any).response || {};
    if (status == 401 && statusText == "invalid") {
      redirect("/app-v2/planning/what");
    } else {
      console.error("Error submitting Step 4:", error);
    }
  } finally {
    setLoading(false);
  }
};

export const uploadImage = async ({
  file,
  onUploadImage,
}: {
  file: File;
  onUploadImage: (url: string) => void;
}) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await callAppV2Api.post("/v1/assets/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    onUploadImage(data.url);
  } catch (error) {
    console.log(error);
  }
};
