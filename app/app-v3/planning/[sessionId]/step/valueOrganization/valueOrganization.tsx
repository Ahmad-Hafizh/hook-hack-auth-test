"use client";
import React, { useEffect } from "react";
import { usePlanningWhatDataContext } from "../../context/planningWhatDataContext";
import { Card } from "../../components/card";
import { ValueCategoryCard } from "./components/ValueOrganizationCard";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ArrowRight } from "lucide-react";
import callApi from "@/config/axios/axios";
import { useParams } from "next/navigation";
import { IDesireOrganization } from "../../context/dataTypes";
import { toast } from "sonner";

const ValueOrganizationPage = ({
  onNext,
  onPrev,
  stepId,
}: {
  stepId?: number;
  onNext: () => void;
  onPrev?: () => void;
}) => {
  const {
    valueOrganization,
    onSetValueOrganization,
    onSetDesireOrganization,
    selectedValueOrganization,
    onSetSelectedValueOrganization,
  } = usePlanningWhatDataContext();
  const { sessionId } = useParams();
  const [submitting, setSubmitting] = React.useState(false);
  const [regenerating, setRegenerating] = React.useState(false);
  // const [valueOrganization, setValueOrganization]= React.useState<IValueOrganization[]>([]);

  const [submitProgress, setSubmitProgress] = React.useState({
    percent: 0,
    message: "",
  });

  const [arrangedCategories, setArrangedCategories] = React.useState([
    {
      id: "people",
      title: "人",
      items: valueOrganization.filter((item) => item.id.startsWith("P")),
    },
    {
      id: "things",
      title: "モノ",
      items: valueOrganization.filter((item) => item.id.startsWith("T")),
    },
    {
      id: "information",
      title: "情報",
      items: valueOrganization.filter((item) => item.id.startsWith("I")),
    },
    {
      id: "vibes",
      title: "雰囲気",
      items: valueOrganization.filter((item) => item.id.startsWith("V")),
    },
  ]);

  useEffect(() => {
    setArrangedCategories([
      {
        id: "people",
        title: "人",
        items: valueOrganization.filter((item) => item.id.startsWith("P")),
      },
      {
        id: "things",
        title: "モノ",
        items: valueOrganization.filter((item) => item.id.startsWith("T")),
      },
      {
        id: "information",
        title: "情報",
        items: valueOrganization.filter((item) => item.id.startsWith("I")),
      },
      {
        id: "vibes",
        title: "雰囲気",
        items: valueOrganization.filter((item) => item.id.startsWith("V")),
      },
    ]);
  }, [valueOrganization]);

  // Check if each category has at least one selection
  const hasAllCategories = () => {
    const prefixes = ["P", "T", "I", "V"];
    return prefixes.every((prefix) =>
      selectedValueOrganization.some((id: string) => id.startsWith(prefix)),
    );
  };

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitProgress({ percent: 10, message: "価値を分析中..." });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/app-v3/planning/what/step4/sse`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionId,
            valueOrganization: valueOrganization,
            selectedValueOrganization: selectedValueOrganization,
            step: stepId || 6,
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
                setSubmitProgress({
                  percent: Number(jsonData.percent),
                  message: jsonData.message,
                });
              } else if (jsonData.desire_tobes) {
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
            try {
              const desireTobes: IDesireOrganization[] = jsonData.desire_tobes;
              onSetDesireOrganization(jsonData.desire_tobes);
              onNext();
            } catch (error: any) {
              toast.error(
                error.response?.data?.message || "An unknown error occurred",
                {
                  position: "bottom-left",
                },
              );
            }
          }
        } catch (e) {
          console.error("Failed to parse final JSON:", buffer, e);
        }
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An unknown error occurred",
        {
          position: "bottom-left",
        },
      );
    } finally {
      setSubmitting(false);
      setSubmitProgress({ percent: 0, message: "" });
    }
  };

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v3/planning/what/step4/fetch", {
        sessionId,
      });

      if (data) {
        if (data.selectedValueOrganization) {
          onSetSelectedValueOrganization(data.selectedValueOrganization);
        }
        if (data.valueOrganization) {
          onSetValueOrganization(data.valueOrganization);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => {
    onRegenerate();
  }, []);

  const onValueChange = (id: string, value: string) => {
    const duplicate = [...valueOrganization];
    const index = duplicate.findIndex((e) => e.id === id);
    duplicate[index].label = value;
    onSetValueOrganization(duplicate);
  };

  const onCheckChange = (id: string, checked: boolean) => {
    const category = id[0]; // P, T, I, or V

    if (checked && selectedValueOrganization.length < 6) {
      if (
        selectedValueOrganization.filter((e: string) => e.startsWith(category))
          .length < 2
      ) {
        onSetSelectedValueOrganization([...selectedValueOrganization, id]);
      }
    } else if (!checked) {
      onSetSelectedValueOrganization(
        selectedValueOrganization.filter((e: any) => e !== id),
      );
    }
  };

  if (regenerating) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingOverlay
          isVisible={true}
          message="前回の選択を読み込んでいます..."
          showProgress={false}
        />
      </div>
    );
  }

  return (
    <>
      {/* Loading Overlay with SSE Progress */}
      <LoadingOverlay
        isVisible={submitting}
        progress={submitProgress.percent}
        message={submitProgress.message || "価値を分析中..."}
        showProgress={true}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
        <div className="w-full mb-4 animate-fade-in-up">
          <div className="w-full flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
                {stepId || 6}. 価値整理
              </h1>
              <p className="text-black text-lg">
                価値を​6つ​選定し、​必要に​応じて​編集してください​（各カテゴリ最低1つずつ選ぶこと）​
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm font-medium text-slate-600">
                選択数:
              </span>
              <span
                className={`text-lg font-bold ${selectedValueOrganization.length === 6 ? "text-[#0093b4]" : "text-slate-800"}`}
              >
                {selectedValueOrganization.length}
              </span>
              <span className="text-sm text-slate-400">/ 6</span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Card
            variant="elevated"
            className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 w-full">
              {arrangedCategories.map((category) => (
                <ValueCategoryCard
                  key={category.id}
                  title={category.title}
                  items={category.items}
                  selectedIds={selectedValueOrganization}
                  onValueChange={onValueChange}
                  onCheckChange={onCheckChange}
                />
              ))}
            </div>
            <div className="flex justify-end mt-10 pt-6 border-t border-slate-100 gap-4">
              <Button
                variant={"secondary"}
                className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100"
                onClick={onPrev}
                disabled={submitting}
              >
                戻る
              </Button>
              <Button
                className="bg-[#0093b4] hover:bg-[#007a92] px-8 py-2.5 rounded-lg font-semibold shadow-sm"
                disabled={
                  submitting ||
                  selectedValueOrganization.length < 6 ||
                  !hasAllCategories()
                }
                onClick={onSubmit}
              >
                次に進む <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ValueOrganizationPage;
