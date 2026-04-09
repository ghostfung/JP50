"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KanaType } from "@/core/data";
import { generateQuizSession, QuizQuestion } from "@/core/engine";
import { useProgressData } from "@/hooks/useProgressData";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import Link from "next/link";

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // 計分相關狀態
  const [score, setScore] = useState(0);
  const [currentAttempts, setCurrentAttempts] = useState(0); 
  const [firstTryCorrects, setFirstTryCorrects] = useState(0);

  const { updateProgress } = useProgressData();
  const { speak } = useAudioEngine();
  const { addScore, userName } = useLeaderboard();

  // 初始化題庫
  useEffect(() => {
    const typesParam = searchParams.get("types");
    const typesArray = typesParam ? (typesParam.split(",") as KanaType[]) : ["hiragana" as KanaType];
    const session = generateQuizSession(typesArray, 50);
    
    if (session.length === 0) {
      router.push("/");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuestions(session);
    }
  }, [searchParams, router]);

  // 當換題時自動唸兩次
  useEffect(() => {
    if (questions.length > 0 && !isFinished) {
      const currentQ = questions[currentIndex];
      speak(currentQ.target.char, 2);
    }
  }, [currentIndex, questions, isFinished, speak]);

  const handleAnswer = (optionId: string) => {
    if (selectedOptionId) return; 
    
    const currentQuestion = questions[currentIndex];
    const correct = currentQuestion.target.id === optionId;
    
    setSelectedOptionId(optionId);
    
    updateProgress(currentQuestion.target.id, correct);

    if (correct) {
      speak(currentQuestion.target.char, 1);
      
      // 計算分數
      let points = 100;
      if (currentAttempts === 1) points = 50;
      else if (currentAttempts >= 2) points = 10;
      
      const newScore = score + points;
      setScore(newScore);
      
      let newFirstTryCorrects = firstTryCorrects;
      if (currentAttempts === 0) {
        newFirstTryCorrects += 1;
        setFirstTryCorrects(newFirstTryCorrects);
      }

      // 判斷是否為最後一題，若是則直接結算
      if (currentIndex + 1 >= questions.length) {
        const accuracy = Math.round((newFirstTryCorrects / questions.length) * 100);
        addScore(userName, newScore, accuracy);
      }

      setTimeout(() => {
        setSelectedOptionId(null);
        setCurrentAttempts(0);
        
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsFinished(true);
        }
      }, 1200); 

    } else {
      // 答錯了，增加嘗試次數並等待使用者重選
      setCurrentAttempts(prev => prev + 1);
      setTimeout(() => {
        setSelectedOptionId(null);
      }, 800);
    }
  };

  if (questions.length === 0) return <div className="text-center mt-20">準備紙筆中... 🖋️</div>;

  if (isFinished) {
    const accuracy = Math.round((firstTryCorrects / questions.length) * 100);

    return (
      <div className="flex flex-col items-center py-10 space-y-6 animate-in zoom-in duration-500 font-handwriting h-full justify-center">
        <div className="text-6xl animate-bounce">🎊</div>
        <h2 className="text-3xl font-bold text-techo-ink text-center leading-relaxed">
          測驗完成！<br />
          <span className="text-xl text-techo-accent bg-white px-4 py-1 rounded-full shadow-sm mt-2 inline-block border border-dashed border-techo-accent">
            {userName || "神秘忍者"}
          </span>
        </h2>
        
        {/* 分數結算板 */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border-2 border-pastel-yellow p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-pastel-yellow/30 rounded-bl-full"></div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-techo-ink/70">總得分</span>
            <span className="text-4xl font-extrabold text-orange-500 font-sans">{score}</span>
          </div>
          
          <div className="flex justify-between items-center border-t border-dashed border-techo-ink/10 pt-4">
            <span className="text-techo-ink/70">一發命中率</span>
            <span className="text-2xl font-bold text-pastel-green font-sans">{accuracy}%</span>
          </div>
        </div>

        <div className="flex gap-4 pt-4 flex-col w-full max-w-xs">
          <Link href="/leaderboard" className="w-full">
            <button className="w-full py-3 bg-yellow-400 text-yellow-900 rounded-full shadow-md hover:-translate-y-1 transition-transform font-bold text-lg flex justify-center items-center gap-2">
              🏆 看排行榜
            </button>
          </Link>
          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <button className="w-full py-3 bg-white rounded-xl border-2 border-techo-accent shadow-sm hover:bg-pastel-pink/30 transition-all font-bold">
                返回大廳 🏠
              </button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <button className="w-full py-3 bg-techo-ink text-white rounded-xl shadow-md hover:bg-techo-ink/80 transition-all font-bold">
                看貼紙簿 📓
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="flex flex-col items-center py-6 space-y-6 w-full max-w-sm mx-auto">
      
      <div className="w-full relative px-2">
        <div className="flex justify-between items-center text-xs text-techo-ink/60 font-bold mb-1 font-sans">
          <Link href="/" className="hover:text-techo-ink text-lg text-techo-ink/60">◀️ 逃跑</Link>
          <div className="flex flex-col items-end">
            <span className="text-orange-500 font-bold text-sm">Score: {score}</span>
            <span>進度 {currentIndex + 1} / {questions.length}</span>
          </div>
        </div>
        <div className="w-full bg-black/5 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-pastel-green transition-all duration-500 ease-out relative"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
          </div>
        </div>
      </div>

      {/* 大卡片 */}
      <div className="relative w-full aspect-[4/3] bg-white shadow-md rounded-xl border border-techo-ink/5 flex flex-col items-center justify-center group overflow-hidden mt-4">
        <div className="absolute -top-2 w-24 h-6 bg-pastel-pink/70 -rotate-2 z-10 mix-blend-multiply" />
        
        <button 
          onClick={() => speak(currentQ.target.char, 2)}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-pastel-blue/30 flex items-center justify-center text-2xl hover:bg-pastel-blue transition-colors active:scale-90 z-20 shadow-sm border border-pastel-blue"
          title="播放發音"
        >
          🔊
        </button>

        <span className="text-8xl font-bold font-sans text-techo-ink uppercase select-none transition-transform group-hover:scale-105 duration-500">
          {currentQ.target.romaji}
        </span>
      </div>

      <p className="font-handwriting text-techo-ink/70">請選出正確的日文字：</p>

      {/* 四選一按鈕 */}
      <div className="grid grid-cols-2 gap-4 w-full px-2">
        {currentQ.options.map((opt) => {
          const isThisSelected = selectedOptionId === opt.id;
          const isCorrectAnswer = opt.id === currentQ.target.id;
          
          let buttonStateStyle = "bg-white border-techo-ink/10 hover:border-techo-accent/60 text-techo-ink";
          
          if (selectedOptionId) {
            if (isCorrectAnswer && isThisSelected) {
              buttonStateStyle = "bg-pastel-green border-pastel-green text-techo-ink scale-105 shadow-md";
            } else if (!isCorrectAnswer && isThisSelected) {
              buttonStateStyle = "bg-pastel-pink border-pastel-pink text-pink-900 opacity-80 scale-95";
            } else {
              buttonStateStyle = "bg-white border-techo-ink/5 opacity-50 grayscale";
            }
          }

          return (
            <button
              key={opt.id}
              disabled={!!selectedOptionId}
              onClick={() => handleAnswer(opt.id)}
              className={`relative aspect-square sm:aspect-auto sm:py-6 rounded-2xl border-2 text-5xl transition-all duration-300 font-handwriting ${buttonStateStyle}`}
            >
              <span>{opt.char}</span>
              
              {selectedOptionId && isCorrectAnswer && isThisSelected && (
                <div className="absolute -top-3 -right-2 text-4xl animate-bounce drop-shadow-sm z-30">💮</div>
              )}
              {selectedOptionId && !isCorrectAnswer && isThisSelected && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-40 animate-pulse z-30">✕</div>
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
