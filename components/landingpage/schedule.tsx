import React from "react";
import TrialDialog from "@/components/landingpage/TrialDialog";

const events = [
  {
    title: (
      <>
        2025年7月〜
        <br />
        募集開始
      </>
    ),
    circleColor: "#fe2858",
    description: "Registration",
    button: (
      <TrialDialog
        trigger={
          <button className="px-2 py-1 bg-[#fe2858] text-white rounded hover:bg-[#ff5e81] text-xs md:text-lg font-bold mt-2 md:mt-3">
            今すぐ申し込む
          </button>
        }
      />
    ),
  },
  {
    title: (
      <>
        2025年8月〜
        <br />
        トライアル開始
      </>
    ),
    circleColor: "#fff",
    description: "Trial Launch",
    button: null,
  },
  {
    title: (
      <>
        2025年10月〜
        <br />
        正式リリース予定
      </>
    ),
    circleColor: "#fff",
    description: "Official Release",
    button: null,
  },
];

export default function Schedule() {
  return (
    <section
      className="relative bg-black pt-20 pb-7 md:py-40 min-h-[400px] flex flex-col items-center px-10"
      id="schedule"
    >
      <div className="max-w-7xl w-full mx-auto">
        <h2 className="text-3xl md:text-2xl font-bold text-white mb-24 md:mb-2 text-center md:text-left">
          スケジュール
        </h2>

        <div className="relative w-full flex flex-col items-center mt-8 md:mt-36">
          {/* Horizontal timeline */}
          <div className="absolute left-0 right-0 top-[52px] md:top-[92px] h-1 w-full bg-white z-0" />
          <div className="relative w-full">
            <div className="flex flex-row justify-between items-start z-10 pt-0 pb-8 gap-2 md:gap-0">
              {events.map((event, idx) => (
                <div
                  className="flex flex-col items-center min-w-0 w-1/3"
                  key={idx}
                >
                  <div className="text-xs md:text-2xl font-bold mb-2 md:mb-4 text-center leading-tight text-white">
                    {event.title}
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="-mt-2 w-7 h-7 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10 mb-2 md:mb-4"
                      style={{
                        backgroundColor: event.circleColor,
                        marginTop: 0,
                      }}
                    />

                    {event.button}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
