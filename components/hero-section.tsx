"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/newlpbg.gif)" }}
      ></div>
      <div className="relative max-w-3/4 mx-auto px-4 md:px-6 py-12 lg:pb-36 lg:pt-44 lg:px-56 z-10">
        <div className="grid lg:grid-cols-2 gap-0 items-center">
          <div>
            <h1
              className="text-3xl md:text-4xl lg:text-[50px] xl:text-[60px] font-bold text-[#2C9FB8] mb-7"
              style={{ lineHeight: "1.2" }}
            >
              動画広告をLPから
              <br className="mx-10 " />
              5分で制作
            </h1>

            <p className="text-[#3d3d3d] text-xl mb-2">
              競合分析を元に簡単操作・省工数で
              <span className="relative inline-block px-1">
                <span className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#FFFF65]"></span>
                <span className="relative text-[#041D22] font-bold">
                  顧客が反応する
                </span>
              </span>
            </p>
            <p className="text-[#3d3d3d] text-xl mb-8">
              動画を制作出稿データから
              <span className="relative inline-block px-1">
                <span className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#FFFF65]"></span>
                <span className="relative text-[#041D22] font-bold">
                  成果につながる訴求
                </span>
              </span>
              を発掘
            </p>

            <motion.button
              className="bg-gradient-to-r from-[#0093c8] to-[#1deec8] hover:from-[#0099a8] hover:to-[#00b399] text-white px-16 py-4 rounded-full lg:text-2xl xl:text-3xl font-bold mb-6 shadow-lg flex items-center gap-3"
              initial={{ y: 0 }}
              animate={{
                y: [0, 0, 0, 0, -3, 3, -5, 3, -2, 1, 0, 0, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                times: [
                  0, 0.15, 0.3, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8,
                  0.9, 1,
                ],
              }}
            >
              <span>1週間無料 | 今すぐ制作する</span>
              <img
                src="/Untitled design (6).png"
                alt=""
                className="h-8 w-auto"
              />
            </motion.button>

            <p className="text-md text-red-600 mb-6 ml-16">
              ※ご希望者には30分の製品説明会を実施します
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-full">
              <img
                src="/Untitled design (3).gif"
                alt="Laptop showing HookHack interface"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
