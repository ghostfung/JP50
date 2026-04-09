"use client";

import { useState } from "react";
import Link from "next/link";
import { KanaType } from "@/core/data";
import { useLeaderboard } from "@/hooks/useLeaderboard";

const CATEGORIES: { id: KanaType; title: string; romaji: string; emoji: string; color: string }[] = [
  { id: "hiragana", title: "平假名", romaji: "Hiragana", emoji: "🌸", color: "bg-pastel-pink" },
  { id: "katakana", title: "片假名", romaji: "Katakana", emoji: "🍰", color: "bg-pastel-blue" },
  { id: "dakuten", title: "濁音/半濁音", romaji: "Dakuten", emoji: "🐻", color: "bg-pastel-yellow" },
  { id: "yoon", title: "拗音", romaji: "Yoon", emoji: "✨", color: "bg-pastel-green" },
];

export default function Home() {
  const [selected, setSelected] = useState<KanaType[]>(["hiragana"]);
  const { userName, saveUserName } = useLeaderboard();

  const toggleCategory = (id: KanaType) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="flex flex-col items-center py-6 space-y-8 animate-in fade-in duration-700 font-handwriting">

      {/* 標題與紙膠帶裝飾 */}
      <div className="relative text-center w-full max-w-xs pt-4">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-8 bg-green-200/50 -rotate-2 mix-blend-multiply rounded z-10" />
        <h1 className="text-4xl font-bold text-techo-ink tracking-widest relative z-20 pt-2">
          五十音手帳
        </h1>
        <p className="text-sm text-techo-ink/70 mt-2 font-sans tracking-widest">
          ~ JP 50 KANA ~
        </p>
      </div>

      {/* 輸入暱稱 */}
      <div className="w-full relative px-2">
        <div className="bg-white p-3 rounded-lg border-2 border-dashed border-techo-accent shadow-sm flex items-center justify-between gap-3">
          <span className="text-xl pl-1">👤</span>
          <input
            type="text"
            placeholder="請輸入您的手帳暱稱..."
            className="w-full bg-transparent outline-none text-lg text-techo-ink placeholder-techo-ink/30 font-bold"
            value={userName}
            onChange={(e) => saveUserName(e.target.value)}
            maxLength={10}
          />
        </div>
      </div>

      {/* 分類選擇網格 (拍立得卡片風) */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {CATEGORIES.map((cat) => {
          const isSelected = selected.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-300 ease-out transform ${isSelected
                  ? "border-techo-accent bg-white shadow-md scale-105 z-10"
                  : "border-transparent bg-white/50 shadow-sm hover:scale-100 hover:bg-white/80 grayscale opacity-70"
                }`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                  💮
                </div>
              )}
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
      <div className="w-full pt-2 flex flex-col space-y-4">
        <Link
          href={userName.trim() ? `/quiz?types=${selected.join(",")}` : "#"}
          onClick={(e) => {
            if (!userName.trim()) {
              e.preventDefault();
              alert("請先輸入您的手帳暱稱，才能開始為您記錄分數喔！ 🖋️");
            }
          }}
          className={`w-full group ${!userName.trim() ? "opacity-90" : ""}`}
        >
          <div className={`${userName.trim() ? "bg-techo-ink text-techo-paper" : "bg-gray-300 text-gray-500"} text-center py-4 rounded-2xl font-bold text-xl shadow-md transition-transform duration-300 active:scale-95 relative overflow-hidden`}>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {userName.trim() ? "開始測驗 ✏️" : "請先輸入暱稱 ⚠️"}
            </span>
            {userName.trim() && (
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            )}
          </div>
        </Link>

        <div className="flex justify-between px-2 pt-2 gap-2">
          {/* 前往進度看板 */}
          <Link
            href="/dashboard"
            className="flex-1 text-center py-3 text-techo-ink/70 hover:text-techo-ink hover:bg-white/50 rounded-lg transition-colors text-sm font-bold border border-transparent hover:border-techo-ink/10"
          >
            我的貼紙簿 📓
          </Link>

          <Link
            href="/leaderboard"
            className="flex-1 text-center py-3 text-techo-ink/70 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors text-sm font-bold border border-transparent hover:border-yellow-200"
          >
            高分排行榜 🏆
          </Link>
        </div>

        {/* 前往五十音圖表 */}
        <Link
          href="/table"
          className="w-full text-center py-1 mt-2 text-techo-ink/70 hover:text-techo-ink transition-colors underline decoration-wavy underline-offset-4 decoration-pastel-blue text-sm"
        >
          查閱五十音發音對照表 📖
        </Link>
      </div>

    </div>
  );
}
