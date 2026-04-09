import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0F2540",
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "50音",
  },
  title: "JP50 五十音練習 | 日文初學者工具",
  description: "免費平假名片假名測驗工具，為日文初學者打造的可愛手帳風格 Japanese Hiragana Quiz！",
  keywords: ["50音練習", "日文初學者工具", "免費平假名片假名測驗", "Japanese Hiragana Quiz", "五十音", "日語學習"],
  openGraph: {
    title: "JP50 五十音練習 | 日文初學者工具",
    description: "免費平假名片假名測驗工具，為日文初學者打造的可愛手帳風格 Japanese Hiragana Quiz！",
    type: "website",
    locale: "zh_TW",
    siteName: "JP50 五十音手帳",
  },
  twitter: {
    card: "summary_large_image",
    title: "JP50 五十音練習",
    description: "免費平假名片假名測驗工具。",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body
        className={`${kleeOne.variable} ${mPlusRounded.variable} antialiased bg-techo-paper text-techo-ink min-h-screen relative dot-grid`}
      >
        <main className="max-w-md mx-auto p-4 md:p-6 min-h-screen border-x-2 border-techo-accent/20 bg-white/40 shadow-xl relative backdrop-blur-sm">
           {/* 裝飾用紙膠帶 */}
           <div className="absolute top-2 left-6 w-24 h-6 bg-pink-300/60 -rotate-3 rounded-sm mix-blend-multiply opacity-80" />
           <div className="absolute top-2 right-6 w-16 h-6 bg-yellow-300/60 rotate-6 rounded-sm mix-blend-multiply opacity-80" />
           
          {children}

          {/* 頁尾版權宣告 */}
          <footer className="absolute bottom-4 left-0 w-full text-center">
            <p className="text-xs text-techo-ink/40 font-sans tracking-widest font-bold">
              © {new Date().getFullYear()} Gray. All Rights Reserved.
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
