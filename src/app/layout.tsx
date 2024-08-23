import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { normalFont } from "./ui/fonts";

  
export const metadata: Metadata = {
  title: "Kolib - 2XKO Combo Translator tool",
  description: "K.O Library: Input your combos and see the translation, easier to visualize and send to friends!",
  

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head >
        <meta property="og:image" content={'/logo.svg'} />
      </head>
      <body className={normalFont.className}>{children}</body>
    </html>
  );
}
