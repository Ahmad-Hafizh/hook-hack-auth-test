export default function Solutions() {
  const solutions = [
    "今あるLP・画像素材を活かして手軽に動画を作りたい",
    "バナーデザインのパターンを広げたい",
    "今使ってる訴求が最適なのかデータを元に検証・改善したい",
  ];

  return (
    <div className="w-full py-20 px-10 md:px-24 flex flex-col items-center bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
        このような課題を解決します
      </h2>
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-lg px-8 py-6 shadow-sm"
          >
            <p className="text-lg md:text-xl text-black text-center">
              {solution}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
