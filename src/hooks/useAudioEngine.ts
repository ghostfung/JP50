"use client";

import { useCallback, useRef } from "react";

export function useAudioEngine() {
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const speak = useCallback((text: string, count = 1) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // 中止目前瀏覽器正在唸的聲音
      window.speechSynthesis.cancel();
      
      // 清除所有預定中還沒唸的定時器（避免按下一題結果上一題還在唸）
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      
      for (let i = 0; i < count; i++) {
        // 第一次立馬唸 (i=0 時間為 0)，第二次相隔 2 秒 (i=1 時間為 2000)
        const tId = setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "ja-JP";
          utterance.rate = 0.9;
          utterance.pitch = 1.1; 
          
          window.speechSynthesis.speak(utterance);
        }, i * 2000);
        
        timeoutsRef.current.push(tId);
      }
    }
  }, []);

  return { speak };
}
