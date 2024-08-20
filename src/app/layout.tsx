import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';


const inter = Inter({ subsets: ["latin"] });


const myFont = localFont({ src: [
  {
    path: '../../public/fonts/shapiro-35-light.otf',
    weight: '500'
  },] });


  
export const metadata: Metadata = {
  title: "Kolib Combo Translator",
  description: "A combo translator for 2XKO",
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
