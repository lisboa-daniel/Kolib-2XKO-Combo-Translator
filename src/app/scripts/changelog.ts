import { Content } from "next/font/google"
import { ChangeLog } from "./definitions"

export const VERSION = 'alpha v0.2.3';

export const CHANGELOG : ChangeLog[] = [
  {
    title: 'Alpha v0.2.4 31th october 2024, Happy hallowen!',
    contents: [
      'Fixed size of () and []',
      'Added variations for quick switch and critical strike',
      'Text translation improved for hold buttons'
    ],
    date: new Date('2024-10-31')  
  },
  {
    title: 'Alpha v0.2.3 02th september 2024',
    contents: [
      'Share code link implemented',
      'Zoom to resize icons implemented',
      'Color theme applied to some packages now it shows the right color'
    ],
    date: new Date('2024-09-02')  
  },
  {
    title: 'Alpha v0.2.2 28th september 2024',
    contents: [
      'Combo display now wrap properly'
    ],
    date: new Date('2024-08-28')  
  },
  {
    title: 'Alpha v0.2.1 28th august 2024',
    contents: [
      'Support neutral in numpad notation', 
      'Result box is bigger now',
      'Minor code quality improvements',
      '[ and ] symbols added; as the font for general text in result was adjusted too',
      'Tips section added',
      'Change log added',
      'Some missing icons were added'
    ],
    date: new Date('2024-08-28')  
  },
  {
    title: 'Alpha v0.2 26th august 2024',
    contents: [
      'Numpad notation support',
      'Fix some style issues',
      'Minor quality improvements',
    ],
    date: new Date('2024-08-26')  
  },
] 



