import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { ScoreRecord } from "@/hooks/useLeaderboard";

const LEADERBOARD_KEY = "global_jp50_leaderboard";

// 獲取全球排行榜
export async function GET() {
  try {
    const board = await kv.get<ScoreRecord[]>(LEADERBOARD_KEY);
    return NextResponse.json(board || []);
  } catch (error) {
    return NextResponse.json({ error: "無法讀取排行榜" }, { status: 500 });
  }
}

// 提交新分數
export async function POST(request: Request) {
  try {
    const newRecord: ScoreRecord = await request.json();
    
    // 先抓取舊的排行榜
    const currentBoard = (await kv.get<ScoreRecord[]>(LEADERBOARD_KEY)) || [];
    
    // 合併並排序 (取前 10 名)
    const newBoard = [...currentBoard, newRecord]
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
        return (a.timeSpent || Infinity) - (b.timeSpent || Infinity);
      })
      .slice(0, 10);
    
    // 存回雲端
    await kv.set(LEADERBOARD_KEY, newBoard);
    
    // 全球累計測試次數 +1
    await kv.incr("global_jp50_total_tests");
    
    return NextResponse.json({ success: true, board: newBoard });
  } catch (error) {
    return NextResponse.json({ error: "分數據交失敗" }, { status: 500 });
  }
}
