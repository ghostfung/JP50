"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KanaType } from "@/core/data";
import { generateQuizSession, QuizQuestion } from "@/core/engine";
import { useProgressData } from "@/hooks/useProgressData";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import Link from "next/link";

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // 紀錄這題選了什麼、是不是對的，用來表現動畫
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { updateProgress } = useProgressData();
  const { speak } = useAudioEngine();

  // 初始化題庫
  useEffect(() => {
    const typesParam = searchParams.get("types");
    const typesArray = typesParam ? (typesParam.split(",") as KanaType[]) : ["hiragana" as KanaType];
    const session = generateQuizSession(typesArray, 50);
    
    if (session.length === 0) {
      router.push("/");
    } else {
      setQuestions(session);
      // 第一題先不自動發音以免瀏覽器阻擋，讓使用者自己點
    }
  }, [searchParams, router]);

  const handleAnswer = (optionId: string) => {
    if (selectedOptionId) return; // 避免重複點擊
    
    const currentQuestion = questions[currentIndex];
    const correct = currentQuestion.target.id === optionId;
    
    setSelectedOptionId(optionId);
    setIsCorrect(correct);
    
    // 如果答對了，就發出聲音念這一個字！
    if (correct) {
      speak(currentQuestion.target.char);
    }
    
    // 寫入 localStorage 進度
    updateProgress(currentQuestion.target.id, correct);

    // 短暫延遲後進入下一題
    setTimeout(() => {
      setSelectedOptionId(null);
      setIsCorrect(null);
      
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 1200); // 1.2 秒讓使用者看清楚可愛的圖示
  };

  if (questions.length === 0) return <div className="text-center mt-20">準備紙筆中... 🖋️</div>;

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-in zoom-in duration-500 font-handwriting">
        <div className="text-6xl animate-bounce">🎊</div>
        <h2 className="text-3xl font-bold text-techo-ink">測驗完成！</h2>
        <p className="text-techo-ink/80 text-lg">您真棒！又離日文大師近了一步！</p>
        <div className="flex gap-4 pt-8">
          <Link href="/">
            <button className="px-6 py-2 bg-white rounded-full border-2 border-techo-accent shadow-sm hover:bg-pastel-pink/30 transition-all font-bold">
              返回首頁 🏠
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-6 py-2 bg-techo-ink text-white rounded-full shadow-md hover:-translate-y-1 transition-transform font-bold">
              看貼紙簿 📓
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="flex flex-col items-center py-8 space-y-6 w-full max-w-sm mx-auto">
      
      {/* 頂部進度條 (紙膠帶風格) */}
      <div className="w-full relative">
        <div className="flex justify-between text-xs text-techo-ink/60 font-bold mb-1 font-sans">
          <span>進度</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-black/5 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-pastel-green transition-all duration-500 ease-out relative"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          >
            {/* 淡淡的斜紋裝飾 */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
          </div>
        </div>
      </div>

      {/* 大卡片: 目標字元 */}
      <div className="relative w-full aspect-square bg-white shadow-md rounded-xl border border-techo-ink/5 flex flex-col items-center justify-center group overflow-hidden mt-8">
        {/* 紙膠帶 */}
        <div className="absolute -top-2 w-20 h-6 bg-pastel-yellow/70 rotate-3 z-10 mix-blend-multiply" />
        
        {/* 發音輔助按鈕 */}
        <button 
          onClick={() => speak(currentQ.target.char)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pastel-blue/30 flex items-center justify-center text-xl hover:bg-pastel-blue transition-colors active:scale-90 z-20"
          title="播放發音"
        >
          🔊
        </button>

        <span className="text-9xl font-bold font-handwriting text-techo-ink select-none transition-transform group-hover:scale-105 duration-500">
          {currentQ.target.char}
        </span>
      </div>

      {/* 提示字眼 */}
      <p className="font-handwriting text-techo-ink/70">請選擇正確的拼音：</p>

      {/* 四選一按鈕 */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {currentQ.options.map((opt) => {
          const isThisSelected = selectedOptionId === opt.id;
          const isCorrectAnswer = opt.id === currentQ.target.id;
          
          let buttonStateStyle = "bg-white border-techo-ink/10 hover:border-techo-accent/60 text-techo-ink";
          
          if (selectedOptionId) {
            if (isCorrectAnswer) {
              // 正確答案亮綠燈
              buttonStateStyle = "bg-pastel-green border-pastel-green text-techo-ink scale-105 shadow-md";
            } else if (isThisSelected) {
              // 選錯的這個亮紅燈
              buttonStateStyle = "bg-pastel-pink border-pastel-pink text-pink-900 opacity-80 scale-95";
            } else {
              // 其他沒選的變淡
              buttonStateStyle = "bg-white border-techo-ink/5 opacity-50";
            }
          }

          return (
            <button
              key={opt.id}
              disabled={!!selectedOptionId}
              onClick={() => handleAnswer(opt.id)}
              className={`relative py-4 px-2 rounded-lg border-2 text-2xl font-bold transition-all duration-300 font-sans tracking-wide ${buttonStateStyle}`}
            >
              <span className="uppercase">{opt.romaji}</span>
              
              {/* 動畫貼紙反饋 */}
              {selectedOptionId && isCorrectAnswer && isThisSelected && (
                <div className="absolute -top-3 -right-2 text-3xl animate-bounce drop-shadow-sm">💮</div>
              )}
              {selectedOptionId && !isCorrectAnswer && isThisSelected && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl opacity-40 animate-pulse">✕</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="text-center pt-20">翻動手帳中... 📖</div>}>
      <QuizContent />
    </Suspense>
  );
}
