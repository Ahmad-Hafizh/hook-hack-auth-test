import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

export function VideoCvrPanel() {
  // Mock data
  const mock = {
    cvr: 87,
    likes: 1200,
    shares: 340,
    comments: 56,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBvNxu4Z0oPlanjVPwzg0y3wv3M3KcBnUR4w&s",
    summary:
      "This video is about a new skincare routinnaile that is trending on TikTok.",
    videoSamples: ["", ""],
    note: "",
  };

  useEffect(() => {
    // Only add the script if it doesn't already exist
    if (
      !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script exists, manually trigger TikTok embed refresh
      if (window && (window as any).tiktokEmbedLoaded) {
        (window as any).tiktokEmbedLoaded();
      }
    }
  }, []);

  return (
    <div className="bg-white p-8 flex flex-col gap-6">
      <div className="text-center mt-3 mb-6 xtracking-tight">
        <h1 className="font-semibold text-xl text-black">Sample results</h1>
        <h1 className="text-sm mt-1 font-normal text-slate-400">
          Result of the video analysis
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-3 justify-center">
        {/* Left panel */}
        <Card className="p-4 flex flex-col gap-4 min-w-[240px] max-w-[320px] rounded-2xl shadow-sm border border-black/5 bg-white">
          <CardHeader className="-mb-4 p-3">
            <h1 className="font-semibold text-lg">Overview</h1>
            <h1 className="text-xs text-slate-400">
              Brief information of the videos
            </h1>
          </CardHeader>{" "}
          <CardContent className="flex flex-col gap-3 p-3">
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  CVR
                </span>
                <span className="font-semibold text-sm text-black">
                  {mock.cvr}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  Likes
                </span>
                <span className="font-semibold text-sm text-black">
                  {mock.likes}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  Shares
                </span>
                <span className="font-semibold text-sm text-black">
                  {mock.shares}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  Comments
                </span>
                <span className="font-semibold text-sm text-black">
                  {mock.comments}
                </span>
              </div>
            </div>
            <div className="mt-4 mb-2 flex flex-col justify-center w-full">
              <span className="text-sm -mt-4 mb-3 font-semibold text-muted-foreground">
                Thumbnail :
              </span>
              <img
                src={mock.thumbnail}
                alt="Thumbnail"
                className="rounded-lg min-h-[250px] bg-blue-50 w-full object-cover  border"
              />
            </div>
            <div className="rounded-xl p-4 mt-2 bg-blue-50 w-full shadow-sm">
              <div className="font-semibold mb-1 text-blue-900 text-sm">
                Summary
              </div>
              <div className="text-xs text-muted-foreground font-normal leading-tight">
                {mock.summary}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Video samples */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* TikTok embed as the first sample */}
          <Card className="flex flex-col items-center justify-center p-4 min-h-[240px] rounded-2xl shadow-sm border border-black/5 bg-white">
            <CardContent className="w-full flex flex-col items-center p-0">
              <div className="mb-3 font-semibold text-black text-base">
                Sample 1
              </div>
              <div className="w-full flex justify-center">
                <blockquote
                  className="tiktok-embed"
                  cite="https://www.tiktok.com/@scout2015/video/6718335390845095173"
                  data-video-id="6718335390845095173"
                  style={{ maxWidth: 605, minWidth: 325 }}
                >
                  <section>
                    <a
                      target="_blank"
                      title="@scout2015"
                      href="https://www.tiktok.com/@scout2015?refer=embed"
                    >
                      @scout2015
                    </a>{" "}
                    Scramble up ur name & I'll try to guess it😍❤️{" "}
                    <a
                      title="foryoupage"
                      target="_blank"
                      href="https://www.tiktok.com/tag/foryoupage?refer=embed"
                    >
                      #foryoupage
                    </a>{" "}
                    <a
                      title="petsoftiktok"
                      target="_blank"
                      href="https://www.tiktok.com/tag/petsoftiktok?refer=embed"
                    >
                      #petsoftiktok
                    </a>{" "}
                    <a
                      title="aesthetic"
                      target="_blank"
                      href="https://www.tiktok.com/tag/aesthetic?refer=embed"
                    >
                      #aesthetic
                    </a>{" "}
                    <a
                      target="_blank"
                      title="♬ original sound - tiff"
                      href="https://www.tiktok.com/music/original-sound-6689804660171082501?refer=embed"
                    >
                      ♬ original sound - tiff
                    </a>
                  </section>
                </blockquote>
              </div>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 min-h-[240px] rounded-2xl shadow-sm border border-black/5 bg-white">
            <CardContent className="w-full flex flex-col items-center p-0">
              <div className="mb-3 font-semibold text-black text-base">
                Sample 2
              </div>
              <div className="w-full flex justify-center">
                <blockquote
                  className="tiktok-embed"
                  cite="https://www.tiktok.com/@scout2015/video/6718335390845095173"
                  data-video-id="6718335390845095173"
                  style={{ maxWidth: 605, minWidth: 325 }}
                >
                  <section>
                    <a
                      target="_blank"
                      title="@scout2015"
                      href="https://www.tiktok.com/@scout2015?refer=embed"
                    >
                      @scout2015
                    </a>{" "}
                    Scramble up ur name & I'll try to guess it😍❤️{" "}
                    <a
                      title="foryoupage"
                      target="_blank"
                      href="https://www.tiktok.com/tag/foryoupage?refer=embed"
                    >
                      #foryoupage
                    </a>{" "}
                    <a
                      title="petsoftiktok"
                      target="_blank"
                      href="https://www.tiktok.com/tag/petsoftiktok?refer=embed"
                    >
                      #petsoftiktok
                    </a>{" "}
                    <a
                      title="aesthetic"
                      target="_blank"
                      href="https://www.tiktok.com/tag/aesthetic?refer=embed"
                    >
                      #aesthetic
                    </a>{" "}
                    <a
                      target="_blank"
                      title="♬ original sound - tiff"
                      href="https://www.tiktok.com/music/original-sound-6689804660171082501?refer=embed"
                    >
                      ♬ original sound - tiff
                    </a>
                  </section>
                </blockquote>
              </div>
            </CardContent>
          </Card>
          {/* Other video samples */}
          {/* {mock.videoSamples.slice(1).map((url, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center justify-center p-4 min-h-[240px] rounded-2xl shadow-sm border border-black/5 bg-white"
            >
              <CardContent className="w-full flex flex-col items-center p-0">
                <div className="mb-3 font-semibold text-black text-base">
                  Sample {idx + 2}
                </div>
                <iframe
                  width="100%"
                  height="200"
                  src={url}
                  title={`Sample ${idx + 2}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl shadow-sm"
                ></iframe>
              </CardContent>
            </Card>
          ))} */}
        </div>
      </div>
    </div>
  );
}
