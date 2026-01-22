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

export const submitStep1New = async ({}: {}) => {
  try {
    const { data } = await callAppV2Api.post("/v1/video/main-content/async", {
      key_message: "stringstri",
      strong_points: ["string", "string", "string"],
      video_length: "15s",
      provider: "openai",
      language: "en",
      selected_values: [
        {
          id: "string",
          category: "people",
          label: "string",
          rationale: "string",
        },
      ],
      selected_tobes: [
        {
          id: "string",
          value_id: "string",
          value_label: "string",
          desire: "security",
          old_assumption: "string",
          new_assumption: "string",
          judgment: "string",
          action: "string",
        },
      ],
      positioning_pattern: {
        pattern_number: 1,
        quadrant: "functional × process",
        quadrant_ja: "string",
        direction: "convergent",
        direction_ja: "収束",
        direction_reason: "string",
        process_description: "string",
        outcome_description: "string",
        one_line_promise: "string",
        source_value_ids: ["string"],
        source_tobe_ids: ["string"],
      },
    });
  } catch (error) {
    console.log(error);
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
