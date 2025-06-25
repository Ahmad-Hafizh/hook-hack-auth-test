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
          <button className="px-6 py-3 bg-[#fe2858] text-white rounded hover:bg-[#ff5e81] text-lg font-bold mt-3">
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
      className="relative bg-black py-40 min-h-[400px] flex flex-col items-center"
      id="schedule"
    >
      <div className="max-w-7xl w-full mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">スケジュール</h2>
        <div className="text-white text-lg mb-12">Schedule</div>
        <div className="relative w-full flex flex-col items-center mt-36">
          {/* Horizontal timeline */}
          <div className="absolute left-0 right-0 top-[92px] h-1 w-full bg-white z-0" />
          <div className="relative w-full flex flex-row justify-between items-start z-10 pt-0 pb-8">
            {events.map((event, idx) => (
              <div className="flex flex-col items-center w-1/4" key={idx}>
                <div className="text-white text-2xl font-bold mb-4 text-center leading-tight">
                  {event.title}
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="-mt-2 w-10 h-10 rounded-full flex items-center justify-center z-10 mb-4"
                    style={{ backgroundColor: event.circleColor, marginTop: 0 }}
                  />
                  <div className="bg-white text-black text-base px-4 py-2 rounded mb-3">
                    {event.description}
                  </div>
                  {event.button}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
