"use client";

import { useState, useEffect } from "react";

export interface ScoreRecord {
  id: string; 
  name: string;
  score: number;
  date: string;
  accuracy: number;
  timeSpent?: number;
  testType?: string;
}

const NAME_KEY = "jp50_kawaii_username";

export function useLeaderboard() {
  const [board, setBoard] = useState<ScoreRecord[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // 初始化時讀取名字與全球排行榜
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem(NAME_KEY);
      if (storedName) setUserName(storedName);
      
      refreshBoard();
    }
  }, []);

  const refreshBoard = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      if (Array.isArray(data)) setBoard(data);
    } catch (e) {
      console.error("讀取全球排行失敗", e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserName = (name: string) => {
    setUserName(name);
    if (typeof window !== "undefined") localStorage.setItem(NAME_KEY, name);
  };

  const addScore = async (name: string, score: number, accuracy: number, timeSpent?: number, testType?: string) => {
    const finalName = name.trim() || "神秘忍者";
    
    const newRecord: ScoreRecord = {
      id: Date.now().toString(),
      name: finalName,
      score,
      accuracy,
      timeSpent,
      testType,
      date: new Date().toLocaleDateString("zh-TW", { month: 'short', day: 'numeric' }),
    };

    // 1. 先即時更新本地畫面 (UX 體驗較好)
    setBoard((prev) => {
      return [...prev, newRecord]
        .sort((a, b) => b.score === a.score ? b.accuracy - a.accuracy : b.score - a.score)
        .slice(0, 10);
    });

    // 2. 同步推送到雲端
    try {
      await fetch("/api/leaderboard", {
        method: "POST",
        body: JSON.stringify(newRecord),
      });
    } catch (e) {
      console.error("同步到雲端失敗", e);
    }
  };

  return { board, userName, saveUserName, addScore, isLoading, refreshBoard };
}
