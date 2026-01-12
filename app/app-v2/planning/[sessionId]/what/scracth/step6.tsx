"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";
import { Card, PageHeader } from "@/components/lp-analyzer";
import { ValueDesireCard } from "@/components/lp-analyzer/ValueDesireCard";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";

const Step6 = ({ onNext }: { onNext: () => void }) => {
  const { desireOrganization, onSetDesireOrganization } =
    usePlanningWhatDataContext();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
      <PageHeader title="価値の整理" />
      <div className="w-full">
        <div className="flex flex-col gap-8">
          {/* card */}

          <Card variant="elevated" className="w-full !p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 w-full ">
              {desireOrganization.map((desireOrg) => (
                <ValueDesireCard
                  value_id={desireOrg.value_id}
                  value_category={desireOrg.value_category}
                  value_label={desireOrg.value_label}
                  desire_1={desireOrg.desire_1}
                  desire_2={desireOrg.desire_2}
                />
              ))}
            </div>
            <div className="flex justify-center mt-10 gap-4">
              <Button
                variant={"secondary"}
                className="bg-gray-50 text-gray-500"
                size={"lg"}
              >
                戻る
              </Button>
              <Button
                className="bg-cyan-600 hover:bg-cyan-700"
                size={"lg"}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    読み込み中...
                  </>
                ) : (
                  <>
                    次に進む <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Step6;
