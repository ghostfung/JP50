"use client";

import { useCallback } from "react";

export function useAudioEngine() {
  const speak = useCallback((text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // 在播放前，取消前面可能還在唸的聲音，避免卡頓重疊
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      // 您可以稍微調整 rate 讓聲音聽起來比較可愛慢條斯理
      utterance.rate = 0.9;
      utterance.pitch = 1.1; 
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
}
