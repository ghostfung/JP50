import { CharacterData, KanaType, kanaData } from "./data";

/**
 * Fisher-Yates 洗牌演算法
 */
export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * 根據選擇的分類生成測驗題庫
 * 限制最大題數為 50 題，並為每一題產生 3 個錯誤選項
 */
export interface QuizQuestion {
  target: CharacterData;
  options: CharacterData[]; // 包含正確答案與三個隨機錯誤選項 (共 4 個) 
}

export function generateQuizSession(types: KanaType[], limit = 50): QuizQuestion[] {
  // 1. 過濾出所有符合分類的字元
  const pool = kanaData.filter((kana) => types.includes(kana.type));
  
  // 2. 防呆機制：如果選擇的分類裡面沒有資料（理論上不會發生），直接回傳空
  if (pool.length === 0) return [];

  // 3. 隨機洗牌並取前 `limit` 名作為本次出題目標
  const selectedTargets = shuffle(pool).slice(0, limit);

  // 4. 為每個目標字元產生 4 個選項
  const questions: QuizQuestion[] = selectedTargets.map((target) => {
    // 取得同分類的選項池作為混淆選項（可增加難度，像是平假名混淆平假名）
    const typePool = kanaData.filter((k) => k.type === target.type);
    
    // 排除正確答案
    let incorrectPool = typePool.filter((k) => k.id !== target.id);
    
    // 如果同類的資料不足 3 個（通常不會），就從大池子拿
    if (incorrectPool.length < 3) {
      incorrectPool = pool.filter((k) => k.id !== target.id);
    }

    // 抽出 3 個錯誤答案
    const shuffledIncorrect = shuffle(incorrectPool).slice(0, 3);
    
    // 合併正確答案並洗牌順序
    const options = shuffle([...shuffledIncorrect, target]);

    return {
      target,
      options,
    };
  });

  return questions;
}
