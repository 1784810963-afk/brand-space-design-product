import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "品牌空间设计平台 - 完整的设计标准体系展示",
  description: "展示品牌空间设计标准、落地项目案例和 AI 驱动的设计助手",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
