"use client";

import { KanaType, kanaData } from "@/core/data";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import Link from "next/link";
import { useState } from "react";

export default function TablePage() {
  const { speak } = useAudioEngine();
  const [activeTab, setActiveTab] = useState<KanaType>("hiragana");

  const tabs: { id: KanaType; label: string }[] = [
    { id: "hiragana", label: "平假名" },
    { id: "katakana", label: "片假名" },
    { id: "dakuten", label: "濁音" },
    { id: "yoon", label: "拗音" },
  ];

  const displayCharacters = kanaData.filter((k) => k.type === activeTab);

  return (
    <div className="flex flex-col items-center py-4 space-y-6 w-full animate-in slide-in-from-right-4 duration-500 font-handwriting">
      
      {/* 頂部導航 */}
      <div className="w-full flex justify-between items-center px-2">
        <Link href="/" className="text-techo-ink/60 hover:text-techo-ink flex items-center gap-1 font-bold font-sans">
          <span>◀</span> 返回大廳
        </Link>
        <span className="text-xl font-bold bg-pastel-blue/30 px-3 py-1 rounded-sm -rotate-1 relative">
          <div className="absolute inset-0 border border-dashed border-blue-400/30 rounded-sm -rotate-1 scale-105 pointer-events-none"></div>
          五十音對照表 📖
        </span>
        <div className="w-20"></div> {/* 佔位 */}
      </div>

      {/* 提示語 */}
      <div className="bg-white/60 w-full text-center py-3 rounded-lg border border-techo-ink/10 shadow-sm relative">
        <div className="absolute -top-3 -right-2 w-8 h-8 bg-pastel-yellow rounded-full mix-blend-multiply opacity-50"></div>
        <p className="text-techo-ink/80">點擊任何一個字都可以聆聽發音喔！</p>
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

      {/* 總表區域 */}
      <div className="w-full bg-white border border-techo-ink/10 rounded-xl rounded-tl-none p-4 shadow-sm z-10 relative">
        <div className="grid grid-cols-5 gap-3">
          {displayCharacters.map((char) => (
            <button
              key={char.id}
              onClick={() => speak(char.char, 1)}
              className="relative flex flex-col items-center justify-center aspect-square rounded-lg border border-techo-ink/10 bg-white shadow-sm hover:bg-pastel-blue/20 hover:scale-105 hover:border-pastel-blue transition-all active:scale-95 group"
            >
              <span className="text-3xl font-bold text-techo-ink">{char.char}</span>
              <span className="text-[10px] text-techo-ink/50 font-sans uppercase bg-black/5 px-2 rounded-full mt-1">{char.romaji}</span>
              
              {/* hover出現可愛的小喇叭 */}
              <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs">🔊</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
