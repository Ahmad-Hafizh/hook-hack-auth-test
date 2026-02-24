"use client";

import React, { useRef, useState } from "react";
import { PlayCircle, PauseCircle, Volume2 } from "lucide-react";

interface VoiceOverOption {
  id: string;
  name: string;
  gender: "male" | "female";
  sampleUrl: string;
}

interface VoiceOverSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const VoiceOverSelector: React.FC<VoiceOverSelectorProps> = ({
  value,
  onChange,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "female" | "male">("all");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ElevenLabs voice IDs
  // Note: To add voice previews, upload sample audio files to Google Drive and update the sampleUrl
  // For now, preview is disabled (sampleUrl is empty)
  const voiceOverOptions: VoiceOverOption[] = [
    // Female voices (Japanese)
    {
      id: "lhTvHflPVOqgSWyuWQry",
      name: "Female Voice 1 - Soft",
      gender: "female",
      sampleUrl:
        "https://drive.google.com/file/d/1SdBNvNSVTdWpyTiZUd_xPQ_K9Kxcm_Lu/view?usp=sharing", // TODO: Add Google Drive URL for voice sample
    },
    {
      id: "RBnMinrYKeccY3vaUxlZ",
      name: "Female Voice 2 - Energetic",
      gender: "female",
      sampleUrl:
        "https://drive.google.com/file/d/1rBHUCt6D1fYQyE0gIexry5KGFqcxM2MD/view?usp=sharing", // TODO: Add Google Drive URL for voice sample
    },
    {
      id: "wcs09USXSN5Bl7FXohVZ",
      name: "Female Voice 3 - Professional",
      gender: "female",
      sampleUrl:
        "https://drive.google.com/file/d/1XA72lRanZC5DaiwMZ1nIrBABjsI3YP4W/view?usp=sharing", // TODO: Add Google Drive URL for voice sample
    },
    // Male voices (Japanese)
    {
      id: "C8e2F6Cm3l58PjXaVpUW",
      name: "Male Voice 1 - Deep",
      gender: "male",
      sampleUrl:
        "https://drive.google.com/file/d/1aeGxLp2-FVhKcEqkxnYzzIB1ELeS8JOk/view?usp=sharing", // TODO: Add Google Drive URL for voice sample
    },
    {
      id: "GKDaBI8TKSBJVhsCLD6n",
      name: "Male Voice 2 - Energetic",
      gender: "male",
      sampleUrl:
        "https://drive.google.com/file/d/1roB28V6nGo9JWJf6MVClv07IWhjqCMVr/view?usp=sharing", // TODO: Add Google Drive URL for voice sample
    },
    {
      id: "pUgmTF2V1ptIKsYb6qON",
      name: "Male Voice 3 - Professional",
      gender: "male",
      sampleUrl:
        "https://drive.google.com/file/d/1Q-UAZfwPF9No4XiWW5IlW5z_agX8rr4j/view?usp=sharing", // TODO: Add Google Drive URL for voice sample
    },
  ];

  // Convert Google Drive download URL to proxy URL for CORS-free playback
  const getStreamingUrl = (url: string): string => {
    // Use our API proxy to avoid CORS issues
    return `/api/audio-proxy?url=${encodeURIComponent(url)}`;
  };

  const handlePlayPause = (optionId: string, sampleUrl: string) => {
    if (playingId === optionId) {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingId(null);
    } else {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Play new audio with proxy URL for CORS-free playback
      const streamUrl = getStreamingUrl(sampleUrl);
      const audio = new Audio(streamUrl);
      audio.onended = () => setPlayingId(null);
      audio.onerror = (e) => {
        console.log("Audio playback failed:", e);
        setPlayingId(null);
      };
      audio.play().catch((err) => {
        console.log("Audio playback error:", err);
        setPlayingId(null);
      });
      audioRef.current = audio;
      setPlayingId(optionId);
    }
  };

  const femaleVoices = voiceOverOptions.filter((v) => v.gender === "female");
  const maleVoices = voiceOverOptions.filter((v) => v.gender === "male");

  const renderVoiceOption = (option: VoiceOverOption) => {
    const hasSample = option.sampleUrl && option.sampleUrl.length > 0;

    return (
      <div
        key={option.id}
        className={`flex items-center gap-2 p-2 rounded transition-all cursor-pointer ${
          value === option.id
            ? "bg-white border border-blue-100 shadow-sm"
            : "hover:bg-white border border-transparent hover:border-gray-200"
        }`}
        onClick={() => onChange(option.id)}
      >
        <input
          type="radio"
          name="voiceover"
          checked={value === option.id}
          onChange={() => onChange(option.id)}
          className="text-[#0093b4] focus:ring-[#0093b4] h-4 w-4 border-gray-300"
        />
        {hasSample ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause(option.id, option.sampleUrl);
            }}
            className={`flex items-center justify-center w-6 h-6 transition-colors ${
              playingId === option.id
                ? "text-[#0093b4]"
                : value === option.id
                  ? "text-gray-700 hover:text-[#0093b4]"
                  : "text-gray-400 hover:text-[#0093b4]"
            }`}
          >
            {playingId === option.id ? <PauseCircle /> : <PlayCircle />}
          </button>
        ) : (
          <div className="flex items-center justify-center w-6 h-6 text-gray-300">
            <PlayCircle />
          </div>
        )}
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <span
            className={`text-xs truncate ${value === option.id ? "font-medium" : "text-gray-600"}`}
          >
            {option.name}
          </span>
        </div>
        {value === option.id && <Volume2 className="w-4 h-4 text-[#0093b4]" />}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 max-w-md">
      <label className="text-sm font-medium text-slate-500">ナレーション</label>
      {/* Gender Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "all"
              ? "text-white bg-[#0093b4] shadow-sm"
              : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => setActiveTab("female")}
          className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "female"
              ? "text-white bg-[#0093b4] shadow-sm"
              : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
          }`}
        >
          女性ボイス
        </button>
        <button
          onClick={() => setActiveTab("male")}
          className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "male"
              ? "text-white bg-[#0093b4] shadow-sm"
              : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
          }`}
        >
          男性ボイス
        </button>
      </div>
      {/* Voice Options */}
      <div className="flex flex-col gap-2 border border-slate-200 rounded-lg p-2 bg-gray-50/50 max-h-[220px] overflow-y-auto">
        {activeTab === "all"
          ? voiceOverOptions.map(renderVoiceOption)
          : activeTab === "female"
            ? femaleVoices.map(renderVoiceOption)
            : maleVoices.map(renderVoiceOption)}
      </div>
    </div>
  );
};

export default VoiceOverSelector;
