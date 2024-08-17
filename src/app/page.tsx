'use client';

import Image from "next/image";
import {generateIcons, translateCombo} from '@/app/scripts/translator';
import { useState } from "react";
import { ReactNode } from "react";

export default function Home() {

  const [comboInput, setComboInput] = useState('d.L > L > M > H > S1> S1 > f f >  H > M > df.H>j.H> m>s2');
  const [iconCombo, setIconCombo] = useState<ReactNode[]>([]);
  const [comboTranslation, setComboTranslation] = useState('');


  
  const handleClick = (comboInput: string) => {
  const [comboText, comboArray] =  translateCombo(comboInput);
  
  setIconCombo(generateIcons(comboArray));
  setComboTranslation(comboText);
  

}

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">

        <h1>Combo translator</h1>
        <div id="form" className="flex w-full">
            <label>Combo recipe</label>
            <input className={'w-full text-xl'} defaultValue={comboInput} onChange={(e) => setComboInput(e.target.value)} name="combo" id="combo" type="text"/>
            <input className={''} value={'send'} type="submit" onClick={() => handleClick(comboInput)}/>
        </div>

        <div id="result">
          <p>Combo translation: </p>
          <p>
            {comboTranslation}
          </p>
        </div>
        <div id="images" className="flex flex-row items-start justify-center">
        {
          iconCombo.map((icon, index) => (
              
              <span className={'pl-2'} key={index}>{icon}</span>
            ))
        }
        </div>
    </main>
  );
}
