"use client";

import React, { useRef, useState } from "react";
import { BGMOption } from "./types";
import { PlayCircle, PauseCircle, Volume2 } from "lucide-react";

type BGMGenre = "bright" | "energetic" | "premium" | "tech" | "corporate";

interface BGMOptionWithGenre extends BGMOption {
  genre: BGMGenre;
}

interface BGMSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const genreLabels: Record<BGMGenre, string> = {
  bright: "明るい",
  energetic: "元気",
  premium: "高級感",
  tech: "テック",
  corporate: "ビジネス",
};

export const BGMSelector: React.FC<BGMSelectorProps> = ({
  value,
  onChange,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState<"all" | BGMGenre>("all");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bgmOptions: BGMOptionWithGenre[] = [
    {
      id: "https://drive.google.com/uc?export=download&id=1Ze1KD3g7rTzlJRf73vBSyequdSU_yu39",
      name: "Bright / Friendly",
      duration: "0:30",
      genre: "bright",
    },
    {
      id: "https://drive.google.com/uc?export=download&id=14pgi3J30Nz1rdEoXdLfIOORlRc5nvxyH",
      name: "Fast / Energetic",
      duration: "0:30",
      genre: "energetic",
    },
    {
      id: "https://drive.google.com/uc?export=download&id=1sBw17sbEGQag4ylSZoSGG0GZS5XW6lQd",
      name: "Premium / Sophisticated 1",
      duration: "0:30",
      genre: "premium",
    },
    {
      id: "https://drive.google.com/uc?export=download&id=11243Fa9XBcrOvn1JzQ3KbPLHW3ys2F_h",
      name: "Premium / Sophisticated 2",
      duration: "0:30",
      genre: "premium",
    },
    {
      id: "https://drive.google.com/uc?export=download&id=1o-fgFYwnyQLTOqIqHHwR1e_dsfE6wXyz",
      name: "Tech / Future",
      duration: "0:30",
      genre: "tech",
    },
    {
      id: "https://drive.google.com/uc?export=download&id=1JOQl9cyc5nbYSAlDvpXe_UaS2ykgqYEH",
      name: "Trust / Corporate",
      duration: "0:30",
      genre: "corporate",
    },
  ];

  const genres: BGMGenre[] = ["bright", "energetic", "premium", "tech", "corporate"];
  const filteredOptions = activeGenre === "all" ? bgmOptions : bgmOptions.filter((option) => option.genre === activeGenre);

  // Convert Google Drive download URL to proxy URL for CORS-free playback
  const getStreamingUrl = (url: string): string => {
    // Use our API proxy to avoid CORS issues
    return `/api/audio-proxy?url=${encodeURIComponent(url)}`;
  };

  const handlePlayPause = (optionId: string) => {
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
      const streamUrl = getStreamingUrl(optionId);
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

  return (
    <div className="flex flex-col gap-3 max-w-md">
      <label className="text-sm font-medium text-slate-500">BGM</label>
      {/* Genre Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg">
        <button
          onClick={() => setActiveGenre("all")}
          className={`py-2 px-3 text-xs font-medium rounded-md transition-all ${
            activeGenre === "all"
              ? "text-white bg-[#0093b4] shadow-sm"
              : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
          }`}
        >
          ALL
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`py-2 px-3 text-xs font-medium rounded-md transition-all ${
              activeGenre === genre
                ? "text-white bg-[#0093b4] shadow-sm"
                : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
            }`}
          >
            {genreLabels[genre]}
          </button>
        ))}
      </div>
      {/* BGM Options */}
      <div className="flex flex-col gap-2 border border-slate-200 rounded-lg p-2 bg-gray-50/50 max-h-[200px] overflow-y-auto">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
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
                name="bgm"
                checked={value === option.id}
                onChange={() => onChange(option.id)}
                className="text-[#0093b4] focus:ring-[#0093b4] h-4 w-4 border-gray-300"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause(option.id);
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
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <span
                  className={`text-xs truncate ${value === option.id ? "font-medium" : "text-gray-600"}`}
                >
                  {option.name}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {option.duration}
                </span>
              </div>
              {value === option.id && <Volume2 className="w-4 h-4 text-[#0093b4]" />}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400 text-xs">
            このジャンルのBGMはありません
          </div>
        )}
      </div>
    </div>
  );
};

export default BGMSelector;
