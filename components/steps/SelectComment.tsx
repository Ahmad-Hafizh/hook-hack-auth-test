import React, { useEffect, useState } from "react";
import callApi from "@/config/axios/axios";
import { Button } from "@/components/ui/button";

interface SelectCommentProps {
  videoListData: any[];
  selectedVideo: any;
  onSelectComment?: (comment: any, fullCommentData: any) => void;
}

const mockResponse = {
  success: true,
  data: {
    comments: [
      {
        name: "えぬえふ",
        like: 3617,
        text: "女子サッカー部の者です。左のやつ時間置いて2回塗るとまじで焼けないです。アネッサと比較しても肌に優しいしコスパが良すぎます。毎日太陽にさらされてるのに肌白いと褒めていただけるので本当にオススメします",
        value: "機能的価値",
      },
      {
        name: "すいれん 柴石",
        like: 3307,
        text: "どっちも使ったことあるけど白くなるのは伸び悪いし日焼け効果高いのはアリーだから間違えないで",
        value: "機能的価値",
      },
      {
        name: "( ◜ᴗ◝)",
        like: 1636,
        text: "Bioreばり良い、、。顔に使ってるんですけど、使い始めてから焼けてないって断言出来るくらい焼けてないです！！！",
        value: "機能的価値",
      },
      {
        name: "B型女子",
        like: 1558,
        text: "女子サッカー部の者です。左のやつ時間置いて2回塗るとまじで焼けないです。アネッサと比較しても肌に優しいしコスパが良すぎます。毎日太陽にさらされてるのに肌白いと褒めていただけるので本当にオススメします",
        value: "機能的価値",
      },
      {
        name: "小麦粉",
        like: 806,
        text: "右の日焼け止めを使ったらトーンアップしたおかげで、顔色悪いよ？大丈夫？と言われたので色黒さんは顔には向いてなさそうです😂",
        value: "機能的価値",
      },
      {
        name: "",
        like: 445,
        text: "2つ目水に濡れたら白くなって手にカルピスついてるみたいになるから手の甲とかには塗らん方がいい🥲👍🏻",
        value: "機能的価値",
      },
      {
        name: "まる",
        like: 424,
        text: "右を愛用している者です！ベタつきも少なく、光拡散ラメが入っているのでトーンアップ効果があります。よく白いねと言われるほど、最強です(><)♡♡これはリピ買いするほど良いのでオススメです！",
        value: "機能的価値",
      },
    ],
    datas: {
      like: 389000,
      comment: 999,
      save: 999,
      share: 999,
    },
  },
};

export const SelectComment: React.FC<SelectCommentProps> = ({
  videoListData,
  selectedVideo,
  onSelectComment,
}) => {
  const [commentData, setCommentData] = useState<any>(null);
  useEffect(() => {
    console.log("INI SELECTED VIDEO : ", selectedVideo);
    const fetchComments = async () => {
      if (selectedVideo) {
        try {
          const payload = {
            input: { demo: true, url: selectedVideo.url, amount: 10 },
          };
          const res = await callApi.post("/scrape-indivisual", payload);
          console.log("INI RESPONSE : ", res.data);
          if (res.data.success) {
            setCommentData(res.data.data);
          } else {
            setCommentData(mockResponse.data);
          }
        } catch (err) {
          setCommentData(mockResponse.data);
        }
      }
    };
    fetchComments();
    console.log("selectedVideo", selectedVideo);
  }, [selectedVideo]);

  if (!selectedVideo) {
    return (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6">No video selected</h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* About video card section */}

      <div className="w-full flex justify-start items-center mb-2">
        <h2 className="text-2xl text-left font-semibold mb-6">動画情報</h2>
      </div>
      <div className="w-full flex flex-col items-center mb-8">
        <div className="w-full bg-white rounded-xl p-6 border border-gray-300 mb-4">
          <div className="my-3">
            <h2 className="text-lg font-semibold mb-4">サマリー</h2>
            <div className="w-full border rounded p-4 text-center text-base text-gray-800 font-medium">
              {selectedVideo.analyse || "No description available."}
            </div>
          </div>

          {commentData && commentData.datas && (
            <div className="grid grid-cols-4 gap-2">
              <div className="border-r last:border-r-0 border-gray-300 flex flex-col items-center justify-center py-3">
                <span className="text-sm text-gray-500 mb-1">いいね数</span>
                <span className="text-lg font-semibold text-gray-800">
                  {commentData.datas.like?.toLocaleString() ?? "-"}
                </span>
              </div>
              <div className="border-r last:border-r-0 border-gray-300 flex flex-col items-center justify-center py-3">
                <span className="text-sm text-gray-500 mb-1">コメント数</span>
                <span className="text-lg font-semibold text-gray-800">
                  {commentData.datas.comment?.toLocaleString() ?? "-"}
                </span>
              </div>
              <div className="border-r last:border-r-0 border-gray-300 flex flex-col items-center justify-center py-3">
                <span className="text-sm text-gray-500 mb-1">シェア数</span>
                <span className="text-lg font-semibold text-gray-800">
                  {commentData.datas.save?.toLocaleString() ?? "-"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center py-3">
                <span className="text-sm text-gray-500 mb-1">セーブ数</span>
                <span className="text-lg font-semibold text-gray-800">
                  {commentData.datas.share?.toLocaleString() ?? "-"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* End about video card section */}
      <div className="w-full flex justify-center items-center mt-5 mb-2">
        <h2 className="text-2xl text-center font-semibold mb-2">
          参考にしたいコメントを選択してください。
        </h2>
      </div>
      {commentData && (
        <>
          {/* <div className="mb-4 w-full flex justify-start items-center">
            <strong>Stats: </strong> Likes: {commentData.datas.likes}, Comments: {commentData.datas.comments}, Saves: {commentData.datas.saves}, Shares: {commentData.datas.shares}
          </div> */}
          <table className="min-w-full border-separate border-spacing-y-3 mb-4">
            <thead>
              <tr>
                <th className="px-2 py-1 border">コメント</th>
                <th className="px-2 py-1 border w-[150px]">価値</th>
                <th className="px-2 py-1 border w-[100px]">いいね数</th>
                <th className="px-2 py-1 border">選択</th>
              </tr>
            </thead>
            <tbody>
              {commentData.comments.map((c: any, idx: number) => (
                <tr key={c.text + "-" + c.like + "-" + (c.name || idx)}>
                  <td className="px-2 py-1 border">{c.text}</td>
                  <td className="px-2 py-1 border w-[150px] text-center">
                    {c.value}
                  </td>
                  <td className="px-2 py-1 border w-[100px] text-center">
                    {c.like}
                  </td>
                  <td className="px-2 py-1 border">
                    <Button
                      className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded-full"
                      onClick={() =>
                        onSelectComment && onSelectComment(c, commentData)
                      }
                    >
                      選択
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
