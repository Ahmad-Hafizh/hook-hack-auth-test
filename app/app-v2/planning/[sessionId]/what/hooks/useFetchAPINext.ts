import callApi from "@/config/axios/axios";
import { redirect } from "next/navigation";
import {
  ICompetitiveMatrix,
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

export const regenerateKeywords = async ({
  sessionId,
  product,
  onSetKeywords,
  setLoading,
}: {
  sessionId: string;
  product: string;
  onSetKeywords: (keywords: any) => void;
  setLoading: (loading: boolean) => void;
}) => {
  setLoading(true);
  try {
    // Reuse step1 endpoint to regenerate keywords
    const { data } = await callApi.post("/app-v2/planning/what/step1", {
      product,
      sessionId,
    });
    onSetKeywords(data.keywords);
  } catch (error) {
    console.error("Error regenerating keywords:", error);
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
    // Save selected keyword to localStorage
    localStorage.setItem("planning_what_selected_keyword", selectedKeywords);

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
  // Get keyword from localStorage as fallback
  const keyword = localStorage.getItem("planning_what_selected_keyword") || "";

  // Validate keyword before making API call
  if (!keyword) {
    console.error("No keyword found in localStorage. Cannot generate visuals.");
    return;
  }

  setLoadingGenerate(true);
  try {
    // Extract domains from URLs to exclude already shown visuals
    const exclude_domains = keyVisuals.map((w) => {
      try {
        return new URL(w.url).hostname;
      } catch {
        return w.url;
      }
    });
    const { data } = await callApi.post(
      "/app-v2/planning/what/step3/generate",
      {
        keyword, // API expects 'keyword' (singular), not 'keywords' (array)
        limit: 6,
        language: "ja",
        exclude_domains,
        provider: "openai",
        sessionId,
      },
    );

    // Add new visuals to existing ones (not replace)
    onSetKeyVisuals([...keyVisuals, ...data.key_visuals]);
  } catch (error) {
    console.error("Error submitting get additional key visuals:", error);
  } finally {
    setLoadingGenerate(false);
  }
};

export const regenerateVisuals = async ({
  setLoadingRegenerate,
  onSetKeyVisuals,
  sessionId,
}: {
  setLoadingRegenerate: (loading: boolean) => void;
  onSetKeyVisuals: (visuals: any[]) => void;
  sessionId: string;
}) => {
  // Get keyword from localStorage as fallback
  const keyword = localStorage.getItem("planning_what_selected_keyword") || "";

  // Validate keyword before making API call
  if (!keyword) {
    console.error("No keyword found in localStorage. Cannot regenerate visuals.");
    return;
  }

  setLoadingRegenerate(true);
  try {
    const { data } = await callApi.post(
      "/app-v2/planning/what/step3/generate",
      {
        keyword, // API expects 'keyword' (singular), not 'keywords' (array)
        limit: 6,
        language: "ja",
        exclude_domains: [], // No exclusions for regenerate - get fresh results
        provider: "openai",
        sessionId,
      },
    );

    // Replace all visuals with new ones
    onSetKeyVisuals(data.key_visuals);
  } catch (error) {
    console.error("Error regenerating key visuals:", error);
  } finally {
    setLoadingRegenerate(false);
  }
};

export const submitStep3 = async ({
  selectedVisuals,
  keyVisuals,
  onSetCompetitiveMatrix,
  onNext,
  setLoadingSubmit,
  sessionId,
}: {
  selectedVisuals: string[];
  keyVisuals: any[];
  onNext: () => void;
  setLoadingSubmit: (loading: boolean) => void;
  onSetCompetitiveMatrix: (competitiveMatrix: ICompetitiveMatrix) => void;
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

    // Get user_url from localStorage as fallback
    const user_url = localStorage.getItem("planning_what_product_url") || "";

    const { data, statusText } = await callApi.post(
      "/app-v2/planning/what/step3",
      {
        competitors,
        sessionId,
        user_url,
      },
    );

    if (statusText == "invalid") {
      redirect("/app-v2/planning/what");
    }

    console.log(data);

    onSetCompetitiveMatrix({
      user: data.key_message.user
        ? {
            url: user_url,
            key_message: data.key_message.user.key_message || "",
            key_message_tags: data.key_message.user.key_message_tags,
            strong_points: data.key_message.user.strong_points || [],
            strong_points_tagged: data.key_message.user.strong_points_tagged,
            cta: data.key_message.user.cta,
            cta_tags: data.key_message.user.cta_tags,
          }
        : { key_message: "", strong_points: [] },
      competitors: (data.key_message.competitors || []).map((c: any, index: number) => ({
        url: competitors[index]?.url || "",
        key_message: c.key_message || "",
        key_message_tags: c.key_message_tags,
        strong_points: c.strong_points || [],
        strong_points_tagged: c.strong_points_tagged,
        cta: c.cta,
        cta_tags: c.cta_tags,
      })),
      suggestion: data.key_message.suggestion
        ? {
            key_message: data.key_message.suggestion.key_message || "",
            key_message_tags: data.key_message.suggestion.key_message_tags,
            strong_points: data.key_message.suggestion.strong_points || [],
            strong_points_tagged: data.key_message.suggestion.strong_points_tagged,
            cta: data.key_message.suggestion.cta,
            cta_tags: data.key_message.suggestion.cta_tags,
          }
        : { key_message: "", strong_points: [] },
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
  console.log(keyMessage);
  console.log(strongPoints);

  try {
    onSetSelectedMatrix({
      key_message: keyMessage,
      strong_points: strongPoints,
    });
    localStorage.setItem(
      "selected_matrix",
      JSON.stringify({
        key_message: keyMessage,
        strong_points: strongPoints,
      }),
    );
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

    // Get user URL from localStorage
    const userUrl = localStorage.getItem("planning_what_product_url") || "";

    // Format competitors to only include required fields (url, key_message, strong_points)
    const formattedCompetitors = competitorsMatrix.map((c: any) => ({
      url: c.url || "",
      key_message: c.key_message,
      strong_points: c.strong_points,
    }));

    const response = await fetch(
      "https://hook-hack.himtalks.my.id/v1/value-organization",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            url: userUrl,
            key_message: keyMessage,
            strong_points: strongPoints,
          },
          competitors: formattedCompetitors,
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
    // Format competitors same as submitStep3 (URL with empty fields, API will fetch details)
    const competitors = competitorUrls.filter(url => url.trim() !== "").map((url) => {
      return {
        url,
        title: "",
        meta_description: "",
        hero_text: {
          headline: "",
          subhead: "",
          cta: "",
        },
      };
    });

    // Save user URL to localStorage (same as scratch path)
    localStorage.setItem("planning_what_product_url", userUrl);

    // Use same API as submitStep3
    const { data, statusText } = await callApi.post(
      "/app-v2/planning/what/step3",
      {
        competitors,
        sessionId,
        user_url: userUrl,
      },
    );

    if (statusText == "invalid") {
      redirect("/app-v2/planning/what");
    }

    // Format response same as submitStep3
    onSetBriefPlanning({
      user: data.key_message.user
        ? {
            url: userUrl,
            key_message: data.key_message.user.key_message || "",
            key_message_tags: data.key_message.user.key_message_tags,
            strong_points: data.key_message.user.strong_points || [],
            strong_points_tagged: data.key_message.user.strong_points_tagged,
            cta: data.key_message.user.cta,
            cta_tags: data.key_message.user.cta_tags,
          }
        : { key_message: "", strong_points: [] },
      competitors: (data.key_message.competitors || []).map((c: any, index: number) => ({
        url: competitors[index]?.url || "",
        key_message: c.key_message || "",
        key_message_tags: c.key_message_tags,
        strong_points: c.strong_points || [],
        strong_points_tagged: c.strong_points_tagged,
        cta: c.cta,
        cta_tags: c.cta_tags,
      })),
      suggestion: data.key_message.suggestion
        ? {
            key_message: data.key_message.suggestion.key_message || "",
            key_message_tags: data.key_message.suggestion.key_message_tags,
            strong_points: data.key_message.suggestion.strong_points || [],
            strong_points_tagged: data.key_message.suggestion.strong_points_tagged,
            cta: data.key_message.suggestion.cta,
            cta_tags: data.key_message.suggestion.cta_tags,
          }
        : { key_message: "", strong_points: [] },
    });
    onNext();
  } catch (error) {
    console.error("Error submitting Step 1 Skip:", error);
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
              // Map API response to IPositioningPatterns interface
              // API returns: functional_value[{quadrant, quadrant_value}], emotional_value[{quadrant, quadrant_value}]
              const positioning_patterns: IPositioningPatterns[] =
                jsonData.positioning_patterns.map((p: any) => {
                  // Find process and result from functional_value array
                  const funcProcess = p.functional_value?.find((f: any) => f.quadrant?.includes("process"));
                  const funcResult = p.functional_value?.find((f: any) => f.quadrant?.includes("result"));
                  // Find direction and reason from emotional_value array
                  const emoResult = p.emotional_value?.find((e: any) => e.quadrant?.includes("result"));
                  const emoProcess = p.emotional_value?.find((e: any) => e.quadrant?.includes("process"));

                  return {
                    pattern_number: p.pattern_number || 0,
                    quadrant: p.quadrant || "",
                    quadrant_ja: p.quadrant_ja || "",
                    direction: p.direction || "",
                    direction_ja: emoResult?.quadrant_value || p.direction_ja || "",
                    direction_reason: emoProcess?.quadrant_value || p.direction_reason || "",
                    process_description: funcProcess?.quadrant_value || p.process_description || "",
                    outcome_description: funcResult?.quadrant_value || p.outcome_description || "",
                    one_line_promise: p.one_liner || p.one_line_promise || "",
                    source_value_ids: p.source_value_ids || [],
                    source_tobe_ids: p.source_tobe_ids || [],
                  };
                });

              console.log("Mapped positioning patterns:", positioning_patterns);

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
          // Map API response to IPositioningPatterns interface
          const positioning_patterns: IPositioningPatterns[] =
            jsonData.positioning_patterns.map((p: any) => {
              const funcProcess = p.functional_value?.find((f: any) => f.quadrant?.includes("process"));
              const funcResult = p.functional_value?.find((f: any) => f.quadrant?.includes("result"));
              const emoResult = p.emotional_value?.find((e: any) => e.quadrant?.includes("result"));
              const emoProcess = p.emotional_value?.find((e: any) => e.quadrant?.includes("process"));

              return {
                pattern_number: p.pattern_number || 0,
                quadrant: p.quadrant || "",
                quadrant_ja: p.quadrant_ja || "",
                direction: p.direction || "",
                direction_ja: emoResult?.quadrant_value || p.direction_ja || "",
                direction_reason: emoProcess?.quadrant_value || p.direction_reason || "",
                process_description: funcProcess?.quadrant_value || p.process_description || "",
                outcome_description: funcResult?.quadrant_value || p.outcome_description || "",
                one_line_promise: p.one_liner || p.one_line_promise || "",
                source_value_ids: p.source_value_ids || [],
                source_tobe_ids: p.source_tobe_ids || [],
              };
            });

          console.log("final mapped positioning patterns:", positioning_patterns);
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
