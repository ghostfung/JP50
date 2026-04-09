"use client";

import { useState, useEffect } from "react";

export interface ScoreRecord {
  id: string; 
  name: string;
  score: number;
  date: string;
  accuracy: number;
}

const LEADERBOARD_KEY = "jp50_kawaii_leaderboard";
const NAME_KEY = "jp50_kawaii_username";

export function useLeaderboard() {
  const [board, setBoard] = useState<ScoreRecord[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LEADERBOARD_KEY);
      if (stored) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setBoard(JSON.parse(stored));
        } catch {}
      }

      const storedName = localStorage.getItem(NAME_KEY);
      if (storedName) setUserName(storedName);
    }
  }, []);

  const saveUserName = (name: string) => {
    setUserName(name);
    if (typeof window !== "undefined") localStorage.setItem(NAME_KEY, name);
  };

  const addScore = (name: string, score: number, accuracy: number) => {
    const finalName = name.trim() || "神秘忍者";
    
    const newRecord: ScoreRecord = {
      id: Date.now().toString(),
      name: finalName,
      score,
      accuracy,
      date: new Date().toLocaleDateString("zh-TW", { month: 'short', day: 'numeric' }),
    };
    
    setBoard((prev) => {
      // 一樣高分的話，正確率高的在前面，然後取前 10 名
      const newBoard = [...prev, newRecord]
        .sort((a, b) => b.score === a.score ? b.accuracy - a.accuracy : b.score - a.score)
        .slice(0, 10);
        
      if (typeof window !== "undefined") localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(newBoard));
      return newBoard;
    });
  };

  return { board, userName, saveUserName, addScore };
}
