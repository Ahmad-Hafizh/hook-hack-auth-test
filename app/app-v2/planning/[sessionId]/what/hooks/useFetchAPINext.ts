import callApi from "@/config/axios/axios";
import { redirect } from "next/navigation";
import {
  IDesireOrganization,
  IKeyVisuals,
  IPositioningPatterns,
} from "./planningWhatDataContext";
import callAppV2Api from "@/config/axios/axiosAppV2";

export const submitStep1Scratch = async ({
  sessionId,
  url,
  onSetKeywords,
  onNext,
  setLoading,
}: {
  sessionId: string;
  url: string;
  onSetKeywords: (keywords: any) => void;
  onNext: () => void;
  setLoading: (loading: boolean) => void;
}) => {
  setLoading(true);
  try {
    const { data } = await callApi.post("/app-v2/planning/what/step1", {
      product: url,
      sessionId,
    });

    onSetKeywords(data.keywords);
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

export const submitStep2Scratch = async ({
  selectedKeywords,
  onNext,
  setLoading,
  sessionId,
  onSetKeyVisuals,
}: {
  selectedKeywords: string;
  onNext: () => void;
  setLoading: (loading: boolean) => void;
  sessionId: string;
  onSetKeyVisuals: (visuals: any[]) => void;
}) => {
  setLoading(true);
  try {
    const { data, statusText } = await callApi.post(
      "/app-v2/planning/what/step2",
      {
        keywords: [selectedKeywords],
        sessionId,
      },
    );

    if (statusText == "invalid") {
      redirect("/app-v2/planning/what");
    }

    onSetKeyVisuals(data.key_visuals);
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

export const getMoreVisuals = async ({
  setLoadingGenerate,
  onSetKeyVisuals,
  keyVisuals,
  sessionId,
}: {
  setLoadingGenerate: (loading: boolean) => void;
  onSetKeyVisuals: (visuals: any[]) => void;
  keyVisuals: IKeyVisuals[];
  sessionId: string;
}) => {
  setLoadingGenerate(true);
  try {
    const exclude_domains = keyVisuals.map((w) => w.url);
    const { data } = await callApi.post(
      "/app-v2/planning/what/step3/generate",
      {
        exclude_domains,
        sessionId,
      },
    );

    onSetKeyVisuals([...keyVisuals, ...data.key_visuals]);
  } catch (error) {
    console.error("Error submitting get additional key visuals:", error);
  } finally {
    setLoadingGenerate(false);
  }
};

export const submitStep3 = async ({
  selectedVisuals,
  keyVisuals,
  onSetBriefPlanning,
  onNext,
  setLoadingSubmit,
  sessionId,
}: {
  selectedVisuals: string[];
  keyVisuals: any[];
  onSetBriefPlanning: (briefPlanning: any) => void;
  onNext: () => void;
  setLoadingSubmit: (loading: boolean) => void;
  sessionId: string;
}) => {
  setLoadingSubmit(true);
  try {
    const selectedVisualsData = keyVisuals.filter((keyVisual) =>
      selectedVisuals.includes(keyVisual.url),
    );
    const competitors = selectedVisualsData.map((visual) => {
      return {
        url: visual.url,
        title: visual.title,
        meta_description: visual.meta_description,
        hero_text: {
          headline: "string",
          subhead: "string",
          cta: "string",
        },
      };
    });

    const { data, statusText } = await callApi.post(
      "/app-v2/planning/what/step3",
      {
        competitors,
        sessionId,
      },
    );

    if (statusText == "invalid") {
      redirect("/app-v2/planning/what");
    }

    console.log(data);

    onSetBriefPlanning({
      user: data.key_message.user
        ? data.key_message.user
        : { key_message: "", strong_points: [] },
      competitors: data.key_message.competitors,
      suggestion: data.key_message.suggestion,
    });
    onNext();
  } catch (error) {
    const { status, statusText } = (error as any).response || {};
    if (status == 401 && statusText == "invalid") {
      redirect("/app-v2/planning/what");
    } else {
      console.error("Error submitting Step 3:", error);
    }
  } finally {
    setLoadingSubmit(false);
  }
};

export const submitStep4 = async ({
  keyMessage,
  strongPoints,
  onNext,
  onSetLoading,
  sessionId,
  competitorsMatrix,
  onSetSubmitProgress,
  onSetValueOrganization,
  onSetSelectedMatrix,
}: {
  keyMessage: string;
  strongPoints: string[];
  onNext: () => void;
  onSetLoading: (loading: boolean) => void;
  sessionId: string;
  competitorsMatrix: any;
  onSetSubmitProgress: (progress: number, message: string) => void;
  onSetValueOrganization: (data: any[]) => void;
  onSetSelectedMatrix: (data: any) => void;
}) => {
  onSetLoading(true);
  try {
    onSetSelectedMatrix({
      key_message: keyMessage,
      strong_points: strongPoints,
    });
    const { data } = await callApi.post("/app-v2/planning/what/step4", {
      key_message: keyMessage,
      strong_points: strongPoints,
      sessionId,
      competitorsMatrix,
    });
    // if (statusText == "invalid") {
    //   redirect("/app-v2/planning/what");
    // }

    console.log(data);

    const response = await fetch(
      "https://hook-hack.himtalks.my.id/v1/value-organization",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            url: "https://example.com/",
            key_message: keyMessage,
            strong_points: strongPoints,
          },
          competitors: competitorsMatrix,
          provider: "openai",
          language: "ja",
          reasoning_effort: "high",
        }),
      },
    );

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim().startsWith("data: ")) {
          try {
            const jsonData = JSON.parse(line.substring(6));
            console.log(jsonData);

            if (jsonData.percent && jsonData.message) {
              onSetSubmitProgress(Number(jsonData.percent), jsonData.message);
            } else if (jsonData.values) {
              onSetValueOrganization(jsonData.values);
              onNext();
            }
          } catch (e) {
            console.error("Failed to parse JSON:", line, e);
          }
        }
      }
    }

    // Process remaining buffer
    if (buffer.trim().startsWith("data: ")) {
      try {
        const jsonData = JSON.parse(buffer.substring(6));
        if (jsonData.values) {
          onSetValueOrganization(jsonData.values);
          onNext();
        }
      } catch (e) {
        console.error("Failed to parse final JSON:", buffer, e);
      }
    }
  } catch (error) {
    const { status, statusText } = (error as any).response || {};
    if (status == 401 && statusText == "invalid") {
      redirect("/app-v2/planning/what");
    } else {
      console.error("Error submitting Step 4:", error);
    }
  } finally {
    onSetLoading(false);
    onSetSubmitProgress(0, "");
  }
};

export const submitStep1Skip = async ({
  competitorUrls,
  userUrl,
  onSetBriefPlanning,
  onNext,
  setLoadingSubmit,
  sessionId,
}: {
  competitorUrls: string[];
  userUrl: string;
  onSetBriefPlanning: (briefPlanning: any) => void;
  onNext: () => void;
  setLoadingSubmit: (loading: boolean) => void;
  sessionId: string;
}) => {
  setLoadingSubmit(true);
  try {
    const competitors = competitorUrls.map((url) => {
      return {
        url,
      };
    });

    const { data } = await callApi.post("/app-v2/planning/what/step1/skip", {
      competitors,
      user_url: userUrl,
      sessionId,
    });

    onSetBriefPlanning({
      user: data.user,
      competitors: data.competitors,
      suggestion: data.suggestion,
    });
    onNext();
  } catch (error) {
    console.error("Error submitting Step 1:", error);
  } finally {
    setLoadingSubmit(false);
  }
};

export const submitStep5 = async ({
  own_lp_summary,
  competitors_summary,
  valueOrganization,
  selectedIds,
  onSetLoading,
  onSetDesireOrganization,
  onSetSubmitProcess,
  onNext,
}: {
  own_lp_summary: string;
  competitors_summary: string[];
  valueOrganization: any[];
  selectedIds: string[];
  onSetLoading: (loading: boolean) => void;
  onSetSubmitProcess: (progress: number, message: string) => void;
  onSetDesireOrganization: (desireOrganization: IDesireOrganization[]) => void;
  onNext: () => void;
}) => {
  onSetLoading(true);
  try {
    const response = await fetch(
      "https://hook-hack.himtalks.my.id/v1/desire-organization",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          own_lp_summary: own_lp_summary,
          competitors_summary: competitors_summary,
          values_12: valueOrganization,
          selected_values_6: selectedIds,
          provider: "openai",
          language: "ja",
          reasoning_effort: "high",
        }),
      },
    );
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim().startsWith("data: ")) {
          try {
            const jsonData = JSON.parse(line.substring(6));
            console.log(jsonData);

            if (jsonData.percent && jsonData.message) {
              onSetSubmitProcess(Number(jsonData.percent), jsonData.message);
            } else if (jsonData.desire_tobes) {
              const desireTobes: IDesireOrganization[] = jsonData.desire_tobes;
              console.log("without interface", jsonData.desire_tobes);
              console.log("with interface", desireTobes);

              onSetDesireOrganization(jsonData.desire_tobes);
              onNext();
            }
          } catch (e) {
            console.error("Failed to parse JSON:", line, e);
          }
        }
      }
    }

    // Process remaining buffer
    if (buffer.trim().startsWith("data: ")) {
      try {
        const jsonData = JSON.parse(buffer.substring(6));
        if (jsonData.desire_tobes) {
          onSetDesireOrganization(jsonData.desire_tobes);
          onNext();
        }
      } catch (e) {
        console.error("Failed to parse final JSON:", buffer, e);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    onSetLoading(false);
    onSetSubmitProcess(0, "");
  }
};

export const submitStep6 = async ({
  own_lp_summary,
  competitors_summary,
  selected_values_6,
  selected_tobe_4,
  onSetSubmitProcess,
  onSetPositioningPatterns,
  onNext,
  onSetLoading,
}: {
  own_lp_summary?: string;
  competitors_summary?: string[];
  selected_values_6?: any[];
  selected_tobe_4?: any[];
  onSetSubmitProcess: (percent: number, message: string) => void;
  onSetPositioningPatterns: (data: IPositioningPatterns[]) => void;
  onNext: () => void;
  onSetLoading: (loading: boolean) => void;
}) => {
  onSetLoading(true);
  try {
    const response = await fetch(
      "https://hook-hack.himtalks.my.id/v1/positioning-outline",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          own_lp_summary: own_lp_summary,
          competitors_summary: competitors_summary,
          selected_values_6: selected_values_6,
          selected_tobe_4: selected_tobe_4,
          provider: "openai",
          language: "ja",
          reasoning_effort: "high",
        }),
      },
    );

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim().startsWith("data: ")) {
          try {
            const jsonData = JSON.parse(line.substring(6));
            console.log(jsonData);

            if (jsonData.percent && jsonData.message) {
              onSetSubmitProcess(Number(jsonData.percent), jsonData.message);
            } else if (jsonData.positioning_patterns) {
              const positioning_patterns: IPositioningPatterns[] =
                jsonData.positioning_patterns;

              console.log(positioning_patterns);

              onSetPositioningPatterns(positioning_patterns);
              onNext();
            }
          } catch (e) {
            console.error("Failed to parse JSON:", line, e);
          }
        }
      }
    }

    // Process remaining buffer
    if (buffer.trim().startsWith("data: ")) {
      try {
        const jsonData = JSON.parse(buffer.substring(6));
        if (jsonData.positioning_patterns) {
          const positioning_patterns: IPositioningPatterns[] =
            jsonData.positioning_patterns;

          console.log("final positioning patterns:", positioning_patterns);
          onSetPositioningPatterns(positioning_patterns);

          onNext();
        }
      } catch (e) {
        console.error("Failed to parse final JSON:", buffer, e);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    onSetLoading(false);
    onSetSubmitProcess(0, "");
  }
};
