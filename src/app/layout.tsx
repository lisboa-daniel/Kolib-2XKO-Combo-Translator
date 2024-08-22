import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';

const myFont = localFont({ src: [
  {
    path: '../../public/fonts/shapiro-35-light.otf',
    weight: '500'
  },] });


  
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
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
