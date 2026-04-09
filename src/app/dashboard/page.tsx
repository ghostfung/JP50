"use client";

import { useProgressData } from "@/hooks/useProgressData";
import { KanaType, kanaData, CharacterData } from "@/core/data";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const { progress, isLoaded } = useProgressData();
  const [activeTab, setActiveTab] = useState<KanaType>("hiragana");

  if (!isLoaded) return <div className="text-center pt-20">翻動貼紙簿中... 📓</div>;

  // 定義狀態判斷
  const getStatus = (charId: string) => {
    const stats = progress[charId];
    if (!stats) return "learning"; // 沒測過

    const accuracy = stats.correctAttempts / stats.totalAttempts;
    
    if (stats.totalAttempts >= 5 && accuracy >= 0.9) return "mastered";
    if (stats.totalAttempts >= 3 && accuracy <= 0.5) return "struggling";
    return "learning";
  };

  const getStatusDecor = (status: string) => {
    switch (status) {
      case "mastered": return { emoji: "💮", style: "border-pastel-green bg-pastel-green/20" };
      case "struggling": return { emoji: "🩹", style: "border-pastel-pink bg-pastel-pink/20" };
      default: return { emoji: "", style: "border-techo-ink/10 bg-white/50" };
    }
  };

  // 篩選出目前的 tab 資料
  const displayCharacters = kanaData.filter((k) => k.type === activeTab);

  // 統計數字
  const masteredCount = kanaData.filter(k => getStatus(k.id) === "mastered").length;
  const strugglingCount = kanaData.filter(k => getStatus(k.id) === "struggling").length;

  const tabs: { id: KanaType; label: string }[] = [
    { id: "hiragana", label: "平假名" },
    { id: "katakana", label: "片假名" },
    { id: "dakuten", label: "濁音" },
    { id: "yoon", label: "拗音" },
  ];

  return (
    <div className="flex flex-col items-center py-4 space-y-6 w-full animate-in slide-in-from-bottom-4 duration-500 font-handwriting">
      
      {/* 頂部導航 */}
      <div className="w-full flex justify-between items-center px-2">
        <Link href="/" className="text-techo-ink/60 hover:text-techo-ink flex items-center gap-1 font-bold font-sans">
          <span>◀</span> 返回
        </Link>
        <span className="text-xl font-bold bg-pastel-yellow/30 px-3 py-1 rounded-sm rotate-1 relative">
          <div className="absolute top-0 left-0 w-full h-full border border-dashed border-yellow-500/30 rounded-sm pointer-events-none -rotate-1 scale-105"></div>
          我的貼紙簿 📓
        </span>
        <div className="w-12"></div> {/* 佔位讓標題置中 */}
      </div>

      {/* 總覽小卡 */}
      <div className="flex gap-4 w-full">
        <div className="flex-1 bg-white p-3 rounded-lg border-2 border-pastel-green shadow-sm relative overflow-hidden">
          <div className="text-xl font-bold text-techo-ink flex justify-between items-end">
            <span className="text-4xl">{masteredCount}</span>
            <span className="text-3xl opacity-50 absolute -right-2 -bottom-2">💮</span>
          </div>
          <div className="text-xs text-techo-ink/70 font-sans mt-1">已精通標章</div>
        </div>
        <div className="flex-1 bg-white p-3 rounded-lg border-2 border-pastel-pink shadow-sm relative overflow-hidden">
          <div className="text-xl font-bold text-techo-ink flex justify-between items-end">
            <span className="text-4xl">{strugglingCount}</span>
            <span className="text-3xl opacity-50 absolute -right-2 -bottom-2">🩹</span>
          </div>
          <div className="text-xs text-techo-ink/70 font-sans mt-1">需要急難救助</div>
        </div>
      </div>

      {/* 分頁便利貼標籤 */}
      <div className="w-full flex space-x-1 pl-2 -mb-2 z-10 relative">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 pt-2 pb-3 rounded-t-lg font-bold transition-colors ${
              activeTab === tab.id 
                ? "bg-white border-x border-t border-techo-ink/10 text-techo-ink z-20" 
                : "bg-white/40 text-techo-ink/50 hover:bg-white/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 網格展示區 */}
      <div className="w-full bg-white border border-techo-ink/10 rounded-xl rounded-tl-none p-4 shadow-sm z-10 relative">
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {displayCharacters.map((char) => {
            const status = getStatus(char.id);
            const decor = getStatusDecor(status);
            
            return (
              <div 
                key={char.id} 
                className={`relative flex flex-col items-center justify-center aspect-square rounded border transition-all ${decor.style}`}
              >
                <span className="text-2xl font-bold text-techo-ink">{char.char}</span>
                <span className="text-[10px] text-techo-ink/60 font-sans uppercase">{char.romaji}</span>
                
                {decor.emoji && (
                  <div className={`absolute -top-2 -right-2 text-lg ${status === 'mastered' ? 'rotate-12' : '-rotate-12'}`}>
                    {decor.emoji}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
