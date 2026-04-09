import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { uuid } = await request.json();
    if (!uuid) return NextResponse.json({ error: "Missing uuid" }, { status: 400 });

    const now = Date.now();
    
    // 1. 真實在線人數追蹤 (使用 KV 的 Sorted Set)
    // 更新或加入目前使用者的存活時間 (保活 30 秒)
    await kv.zadd("jp50_online_users", { score: now, member: String(uuid) });
    // 清除超過 30 秒沒有發送心跳包的 UUID
    await kv.zremrangebyscore("jp50_online_users", "-inf", now - 30000);
    // 計算目前活著的數量
    const onlineUsers = await kv.zcard("jp50_online_users");

    // 2. 抓取全球累積挑戰次數
    // 這個數字是在 /api/leaderboard 提交成績時增加的
    // 加入 90 作為初始基數，讓數字看起來比較豐富
    const totalTests = ((await kv.get<number>("global_jp50_total_tests")) || 0) + 90;

    return NextResponse.json({ onlineUsers: Math.max(1, onlineUsers), totalTests });
  } catch (error) {
    return NextResponse.json({ error: "取得狀態失敗" }, { status: 500 });
  }
}
