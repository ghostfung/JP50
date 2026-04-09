"use client";

import { useState, useEffect } from "react";

export interface MasteryStatus {
  correctAttempts: number;
  totalAttempts: number;
}

export type OverallProgress = Record<string, MasteryStatus>;

const STORAGE_KEY = "jp50_kawaii_progress";

export function useProgressData() {
  const [progress, setProgress] = useState<OverallProgress>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // 初始化時讀取 localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProgress(JSON.parse(stored));
        } catch (e) {
          console.error("無法讀取進度檔案", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // 更新單個字元的進度
  const updateProgress = (charId: string, isCorrect: boolean) => {
    setProgress((prev) => {
      const current = prev[charId] || { correctAttempts: 0, totalAttempts: 0 };
      const newProgress = {
        ...prev,
        [charId]: {
          correctAttempts: current.correctAttempts + (isCorrect ? 1 : 0),
          totalAttempts: current.totalAttempts + 1,
        },
      };
      
      // 同步寫入 localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      }
      return newProgress;
    });
  };

  return { progress, updateProgress, isLoaded };
}
