"use client";

import { useState } from "react";
import Link from "next/link";
import { KanaType } from "@/core/data";

const CATEGORIES: { id: KanaType; title: string; romaji: string; emoji: string; color: string }[] = [
  { id: "hiragana", title: "平假名", romaji: "Hiragana", emoji: "🌸", color: "bg-pastel-pink" },
  { id: "katakana", title: "片假名", romaji: "Katakana", emoji: "🍰", color: "bg-pastel-blue" },
  { id: "dakuten", title: "濁音/半濁音", romaji: "Dakuten", emoji: "🐻", color: "bg-pastel-yellow" },
  { id: "yoon", title: "拗音", romaji: "Yoon", emoji: "✨", color: "bg-pastel-green" },
];

export default function Home() {
  const [selected, setSelected] = useState<KanaType[]>(["hiragana"]);

  const toggleCategory = (id: KanaType) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        // 防止全部取消，至少要選一個
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="flex flex-col items-center py-8 space-y-8 animate-in fade-in duration-700 font-handwriting">
      
      {/* 標題與紙膠帶裝飾 */}
      <div className="relative text-center w-full max-w-xs">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-green-200/50 -rotate-2 mix-blend-multiply rounded z-10" />
        <h1 className="text-4xl font-bold text-techo-ink tracking-widest relative z-20 pt-2">
          五十音手帳
        </h1>
        <p className="text-sm text-techo-ink/70 mt-2 font-sans tracking-widest">
          ~ JP 50 KANA ~
        </p>
      </div>

      {/* 歡迎小語 */}
      <div className="bg-white/60 p-4 rounded-xl border border-techo-accent/30 shadow-sm w-full relative">
        <div className="absolute top-2 left-2 text-techo-accent">💬</div>
        <p className="text-center text-lg text-techo-ink/80 pt-1">
          今天想從哪一頁開始複習呢？
        </p>
      </div>

      {/* 分類選擇網格 (拍立得卡片風) */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {CATEGORIES.map((cat) => {
          const isSelected = selected.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-300 ease-out transform ${
                isSelected 
                  ? "border-techo-accent bg-white shadow-md scale-105" 
                  : "border-transparent bg-white/50 shadow-sm hover:scale-100 hover:bg-white/80 grayscale opacity-70"
              }`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                  💮
                </div>
              )}
              {/* 寶麗萊風格的相片區域 */}
              <div className={`w-full aspect-square rounded-md flex items-center justify-center text-5xl mb-2 ${cat.color} bg-opacity-40`}>
                {cat.emoji}
              </div>
              <span className="text-lg font-bold">{cat.title}</span>
              <span className="text-xs text-techo-ink/60 font-sans uppercase">{cat.romaji}</span>
            </button>
          );
        })}
      </div>

      {/* 主要按鈕版塊 */}
      <div className="w-full pt-4 flex flex-col space-y-4">
        <Link 
          href={`/quiz?types=${selected.join(",")}`}
          className="w-full group"
        >
          <div className="bg-techo-ink text-techo-paper text-center py-4 rounded-2xl font-bold text-xl shadow-md transition-transform duration-300 active:scale-95 group-hover:-translate-y-1 relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              開始測驗 ✏️
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </div>
        </Link>

        {/* 前往進度看板 */}
        <Link 
          href="/dashboard"
          className="w-full text-center py-3 text-techo-ink/70 hover:text-techo-ink transition-colors underline decoration-wavy underline-offset-4 decoration-techo-accent"
        >
          查看我的收集印章簿 📓
        </Link>
      </div>

    </div>
  );
}
