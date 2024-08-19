'use client';

import Image from "next/image";
import {generateIcons, translateCombo} from '@/app/scripts/translator';
import { useState } from "react";
import { ReactNode } from "react";
import { CommandIconObject, CommandObject } from "./scripts/definitions";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Title from "./ui/title";
import localFont from "next/font/local";

const boldFont = localFont({ src: [
  {
    path: '/../../public/fonts/shapiro-95-super-extd.ttf',
    weight: '500',

  },],
  variable: '--font-shapiro75h' });

  
export default function Home() {

  const [comboInput, setComboInput] = useState('d.L > L > M > H > S1> S1 > ff >  H > M > df.H>j.H> m>s2');
  const [commandCombo, setCommandCombo] = useState<CommandObject[]>([]);
  const [comboTranslation, setComboTranslation] = useState('');
  const [useD, setUseD] = useState(true);
  const [ignoreDot, setIgnoreDot] = useState(false)

  
  const handleClick = (comboInput: string) => {
  const [comboText, comboArray] =  translateCombo(comboInput, {
    igDot: ignoreDot,
    useD: useD
  });
  
  setCommandCombo(generateIcons(comboArray));
  setComboTranslation(comboText);
  

}

  
  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-between p-24">
      <div className="flex flex-row w-full items-start justify-center">
        <Title text="2XKO Combo Translator" style=" text-center text-4xl " />
        <p className="text-left">&nbsp;alpha v.0.1</p>
      </div>
 
        <div id="form" className="flex flex-col w-full">  
            <label>Combo recipe</label> 
            <div className="flex flex-row items-center justify-between">
              <input className={'w-full text-xl p-2 '} defaultValue={comboInput} onChange={(e) => setComboInput(e.target.value)} name="combo" id="combo" type="text"/>
              <input className={`text-xl p-2 ml-2 text-[#1c1c1c] bg-[#cdf564] cursor-pointer hover:bg-[#93b63c] font-extrabold ${boldFont.className}`} value={'GO'} type="submit" onClick={() => handleClick(comboInput)}/>
            </div>

        </div>
        
        <div id="settings" className="flex w-full flex-col">
          <p>Settings</p>
        <FormGroup>
          <FormControlLabel control={
            <Switch
            checked={useD}
            onChange={(e) => setUseD(e.target.checked)}
             inputProps={{ 'aria-label': 'Use Dash as (D) button' }
             }/>} 
            
            label="Use Dash as (D) button" />
          

          <FormControlLabel control={
            <Switch
            checked={ignoreDot}
            onChange={(e) => setIgnoreDot(e.target.checked)}
             inputProps={{ 'aria-label': 'Ignore dot' }
             }/>} 
            
            label="Ignore Dot" />
          

        </FormGroup>
        
        </div>
        <div id="result">
          <p>Combo translation: </p>
          <p>
            {comboTranslation}
          </p>
        </div>
        <div id="images" className="flex flex-row items-start justify-center">
        {
            
           commandCombo.map((cmd, index) => (
              
              <span className={'pl-2'} key={index}>{cmd.node}</span>
            ))
        }
        </div>
        <footer className="bg-[#cdf564] w-full  text-gray-900 py-4 px-6 text-center font-extrabold">
          <p className="text-sm">
            This is a free tool made by a fan for the FGC / 2XKO community. All rights reserved for Riot Games © 2024
          </p>
        </footer>
    </main>
  );
}
