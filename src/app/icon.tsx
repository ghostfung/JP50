import { ImageResponse } from 'next/og';

// 輸出標籤大小與類型
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#FCFAF2', // 對應 techo-paper 的背景色
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '2px solid #fdba74', // 對應 pastel-yellow 邊框
        }}
      >
        💮
      </div>
    ),
    { ...size }
  );
}
