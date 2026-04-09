"use client";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import Link from "next/link";

export default function LeaderboardPage() {
  const { board, isLoading, refreshBoard } = useLeaderboard();

  return (
    <div className="flex flex-col items-center py-6 space-y-6 w-full max-w-sm mx-auto animate-in slide-in-from-bottom-4 duration-500 font-handwriting">
      
      {/* 頂部導航 */}
      <div className="w-full flex justify-between items-center px-4">
        <Link href="/" className="text-techo-ink/60 hover:text-techo-ink flex items-center gap-1 font-bold font-sans">
          <span>◀</span> 返回
        </Link>
        <span className="text-xl font-bold bg-pastel-yellow/30 px-4 py-1 rounded-sm rotate-2 relative">
          <div className="absolute inset-0 border border-dashed border-yellow-500/40 rounded-sm -rotate-2 scale-105 pointer-events-none"></div>
          全球排行榜 🏆
        </span>
        <button 
          onClick={() => refreshBoard()}
          className={`text-xl p-1 hover:rotate-180 transition-transform duration-500 ${isLoading ? 'animate-spin' : ''}`}
          title="重新整理"
        >
          🔄
        </button>
      </div>

      <div className="w-full px-2 mt-4 relative">
        {isLoading && (
          <div className="absolute inset-x-0 -top-6 text-center text-xs text-techo-ink/40 animate-pulse">
            正在連線到雲端手帳... ☁️
          </div>
        )}

        {board.length === 0 && !isLoading ? (
          <div className="text-center py-20 text-techo-ink/60 bg-white/50 rounded-2xl border-2 border-dashed border-techo-ink/10">
            <div className="text-4xl mb-4 opacity-50">👻</div>
            <p>目前還沒有人挑戰過喔！<br />快去成為第一個上榜的勇者吧！</p>
          </div>
        ) : (
          <div className="space-y-3">
            {board.map((record, index) => {
              // 前三名給特別的光環
              let rankStyle = "bg-white border-techo-ink/10";
              let medal = <span className="w-6 text-center text-techo-ink/40 font-sans font-bold">{index + 1}</span>;
              
              if (index === 0) {
                rankStyle = "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-300 shadow-md scale-105 z-10 relative";
                medal = <span className="w-6 text-center text-xl">👑</span>;
              } else if (index === 1) {
                rankStyle = "bg-gradient-to-r from-gray-100 to-white border-gray-300 shadow-sm";
                medal = <span className="w-6 text-center text-lg">🥈</span>;
              } else if (index === 2) {
                rankStyle = "bg-gradient-to-r from-orange-50 to-white border-orange-200 shadow-sm";
                medal = <span className="w-6 text-center text-lg">🥉</span>;
              }

              return (
                <div 
                  key={record.id}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 ${rankStyle} transition-all`}
                >
                  <div className="flex items-center gap-3">
                    {medal}
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-techo-ink">{record.name}</span>
                      <span className="text-[10px] text-techo-ink/50 font-sans tracking-wide">{record.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="font-extrabold text-orange-500 font-sans text-xl tracking-tight">
                      {record.score}
                    </span>
                    <span className="text-xs text-pastel-green font-bold font-sans">
                      準確率 {record.accuracy}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
