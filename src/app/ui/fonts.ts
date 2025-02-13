
import localFont from "next/font/local";

import { Zen_Kaku_Gothic_New } from 'next/font/google'
export const normalFont = Zen_Kaku_Gothic_New({ subsets: ['latin'], weight: '500' })

// export const normalFont = localFont({ src: [
//   {
//     path: '../../../public/fonts/shapiro-35-light.otf',
//     weight: '500'
//   },] });

export const boldFont = localFont({ src: [
  {
    path: '../../../public/fonts/shapiro-95-super-extd.ttf',
    weight: '500',

  },],
  variable: '--font-shapiro-95-super-extd' });


