import localFont from "next/font/local";

interface TitleProps {
  text: string,
  style?:string
}

const titleFont = localFont({ src: [
  {
    path: '../../../public/fonts/shapiro-95-super-extd.ttf',
    weight: '500',

  },],
  variable: '--font-shapiro75h' });

export default function Title( {text, style}:TitleProps){
  return (
    <h1 className={`${titleFont.className} ${style}`}>{text}</h1>
  )
}