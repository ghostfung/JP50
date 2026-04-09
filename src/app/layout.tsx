import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, Klee_One } from "next/font/google";
import "./globals.css";

const kleeOne = Klee_One({
  variable: "--font-klee-one",
  weight: ["400", "600"],
  subsets: ["latin"], // Note: Google Fonts may not fully subset Japanese without string, but standard import pulls Japanese support usually. Actually Klee One supports Japanese.
});

const mPlusRounded = M_PLUS_Rounded_1c({
  variable: "--font-mplus-rounded",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JP50 - 可愛五十音手帳",
  description: "日系風格的五十音學習手帳",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${kleeOne.variable} ${mPlusRounded.variable} antialiased bg-techo-paper text-techo-ink min-h-screen relative dot-grid`}
      >
        <main className="max-w-md mx-auto p-4 md:p-6 min-h-screen border-x-2 border-techo-accent/20 bg-white/40 shadow-xl relative backdrop-blur-sm">
           {/* 裝飾用紙膠帶 */}
           <div className="absolute top-2 left-6 w-24 h-6 bg-pink-300/60 -rotate-3 rounded-sm mix-blend-multiply opacity-80" />
           <div className="absolute top-2 right-6 w-16 h-6 bg-yellow-300/60 rotate-6 rounded-sm mix-blend-multiply opacity-80" />
           
          {children}
        </main>
      </body>
    </html>
  );
}
