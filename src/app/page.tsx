'use client';

import Image from "next/image";
import {COMMANDS, generateIcons, translateCombo} from '@/app/scripts/translator';
import { useState } from "react";
import { ReactNode } from "react";
import { CommandIconObject, CommandObject, CommandObjectList } from "./scripts/definitions";
import { Box, Button, FormControlLabel, FormGroup, Modal, Switch, Typography } from "@mui/material";
import Title from "./ui/title";
import localFont from "next/font/local";

const boldFont = localFont({ src: [
  {
    path: '/../../public/fonts/shapiro-95-super-extd.ttf',
    weight: '500',

  },],
  variable: '--font-shapiro75h' });

const style = {
  position: 'absolute' as 'absolute',
  top: '42%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: '600px',
  overflowY: 'scroll',
  color: '#dddddd',
  bgcolor: '#1c1c1c',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

/*
interface ComboListItem {
  input : string,
  comboTranslation: string,
  iconCombo: CommandObject[],
}*/

export default function Home() {

  const [comboInput, setComboInput] = useState('d.L > L > M > H > S1> S1 > ff >  H > M > df.H>j.H> m>s2');
  const [commandCombo, setCommandCombo] = useState<CommandObject[]>([]);
  const [comboTranslation, setComboTranslation] = useState('');
  const [useD, setUseD] = useState(true);
  const [ignoreDot, setIgnoreDot] = useState(false)
  const [wrap, setWrap] = useState(false)
  

  const [inputHistory, setInputHistory] = useState<string[]>(['d.L > L > M > H > S1> S1 > ff >  H > M > df.H>j.H> m>s2']);

  /*const[comboList, setComboList] = useState<ComboListItem[]>([
    {
      input: 'd.L > L > M > H > S1> S1 > ff >  H > M > df.H>j.H> m>s2',
      comboTranslation: '',
      iconCombo: []
    }
  ]);*/


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleClick = (comboInput: string) => {
  const [comboText, comboArray] =  translateCombo(comboInput, {
    igDot: ignoreDot,
    useD: useD
  });


  let iconCombo = generateIcons(comboArray);

  setCommandCombo(iconCombo);
  setComboTranslation(comboText);


  comboLines[activeLine].sequence = iconCombo;


}

const realTimeUpdate = (comboInput : string) => {

  let prevInput = inputHistory;

  prevInput[activeLine] = comboInput;

  setInputHistory(prevInput);

  setComboInput(comboInput);
  handleClick(comboInput);
}



  const [activeLine, setActiveLine] = useState(0);


  const [comboLines, setComboLines] = useState<CommandObjectList[]> ([{
    name: 'default',
    sequence: []
  }]);

  const handlerAddRow = () => {
    setComboLines( [...comboLines, {
      
      name: 'newline'+(comboLines.length-1).toString(),
      sequence: []
    }])

    inputHistory.push('');
    setActiveLine(comboLines.length);
    
  }  


  const changeActiveLine = (idx : number) =>{
    console.log(`inputHistory[idx] = ${inputHistory[idx]}`)
    setComboInput(inputHistory[idx]);
    setActiveLine(idx);

  }

  const changeLineName = () => {
    window.alert("to be implemented");
  }

   
  function handlerGeneratePng(): void {
    window.alert("Function not implemented.");
  }

  function handlerGenerateCode(): void {
    window.alert("Function not implemented.");
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-between pl-2 pr-2 md:pl-24 md:pr-24  pb-12">
      <div className="left-0 flex flex-row w-full items-start justify-center h-[170px] z-50 fixed bg-[#0e0e0e] ">

        <img src="/logo.svg" width="64px" alt="logo" className="bg-white p-[1px] mt-3 mr-2 rounded-xl "/>

        <Title text="2XKO Combo Translator" style=" text-center text-2xl md:text-4xl mt-8" />
        <p className="text-left mt-12 md:mt-8">&nbsp;alpha v.0.1</p>
      </div>
      
        <div id="form" className="flex flex-col w-[86%] top-[10%] fixed z-50">  
            <label className="text-[#1c1c1c] w-[120px] pl-1 pr-1 text-left text-sm mt-5 font-extrabold bg-[#cdf564]">Combo recipe</label> 
            <div className="flex flex-row items-center justify-between">
              <input value={comboInput} id="combo_input" className={'w-full text-xl p-2 '} defaultValue={comboInput} onChange={(e) => realTimeUpdate(e.target.value)} name="combo" type="text"/>
              <input className={`text-xl p-2 ml-2 text-[#1c1c1c] bg-[#cdf564] cursor-pointer hover:bg-[#93b63c] font-extrabold ${boldFont.className}`} value={'GO'} type="submit" onClick={() => handleClick(comboInput)}/>
            </div>

            <div className="w-full flex items-end justify-end">
            <button className={`text-nm p-2 text-[#1c1c1c] bg-[#cdf564] cursor-pointer hover:bg-[#93b63c] font-extrabold ${boldFont.className} w-[200px] mt-2  items-end`} onClick={handleOpen}>Command List</button>
            </div>

        </div>


              {/* commands modal*/}
              <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                <Title text="Command usage" style=" text-center text-4xl " />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <p>
                    This is directly supported:
                  </p>
                <ul className="space-y-2 text-[#cdf564] bg-[#1c1c1c] p-4 rounded-lg shadow-lg">
                {COMMANDS.map(cmd => (
                  <li key={cmd.key} className="flex items-center p-2 bg-[#383838] rounded-md hover:bg-[#636262] transition-colors duration-200">
                    <span className=" font-semibold text-[] mr-2">{cmd.key}</span>
                    <span className=" flex flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      {cmd.alias.map((word, index) => (
                        <span key={index} className="mr-1">{word} </span>
                      ))}
                      <img width={'32px'} height={'32px'} className="pl-2" src={'commands/'+cmd.icon}></img>
                    </span>
                  </li>
                ))}
                <li className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  <span className="font-medium text-gray-700 dark:text-gray-200">anything with ( ) are read as hold</span>
                </li>
              </ul>
                </Typography>
              </Box>
            </Modal>
        
        {/* settings  */}
        <div id="settings" className="flex w-full flex-col mt-[180px]">
        <label className="text-left text-xl mt-5 font-extrabold">Settings</label>
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

            
          <FormControlLabel control={
            <Switch
            checked={wrap}
            onChange={(e) => setWrap(e.target.checked)}
             inputProps={{ 'aria-label': 'Ignore dot' }
             }/>} 
            
            label="Wrap combo display" />
          

        </FormGroup>

        {/*        results          */}
        </div>


        <div id="result" className="p-0 m-0 mt-2">
        <label className="text-left text-xl font-extrabold">Combo translation: </label>
          <p>
            {comboTranslation}
          </p>
        </div>

        <div id="image results" className="flex flex-col w-full mt-2 mb-2 ">
  
            {
              //render the combo lines
              comboLines.map(line => (
                <div className="flex flex-col">
                <button className={`text-nm p-2 text-[#1c1c1c] bg-[#64d3f5] cursor-pointer hover:bg-[#398da7] font-extrabold ${boldFont.className} w-[auto] mt-2  ${comboLines[activeLine].name == line.name ? '' :'hidden'}`} onClick={changeLineName}>Edit name</button> 
                <button onClick={() => changeActiveLine(

                  comboLines.findIndex(l => l.name == line.name)
                
                
                
                )} id="default-row" className="mb-4 bg-[#33353c] hover:bg-[#52555f]" 
                
                >
                
                <p className={`mb-2 text-xl font-extrabold text-left p-2 ${comboLines[activeLine].name == line.name ? 'text-[#cdf564]' :''} `}>{line.name}</p>  

                
                

                  <div className={`flex w-full p-2 bg-[#33353c] h-min-12  ${wrap? 'md:flex-wrap': 'md:flex-row'} items-start justify-start`}>
                  
                  {
                      
                    line.sequence.map((cmd, index) => (
                        
                        <span className={'pl-2'} key={index}>{cmd.node}</span>
                      ))
                  }
                  </div>
      
      
      
                </button>

                </div>
              ))
              
            }  

          <div className="flex flex-row">
          
          <span className="mr-2">
            <button onClick={() => handlerAddRow()} className={`text-nm p-2 text-[#1c1c1c] bg-[#cdf564] cursor-pointer hover:bg-[#93b63c] font-extrabold mb-2 mt-2 ${boldFont.className}`}> Add row</button>
          </span>

          <span className="mr-2">
            <button onClick={() => handlerGeneratePng()} className={`text-nm p-2 text-[#1c1c1c] bg-[#f57564] cursor-pointer hover:bg-[#b94b3d] font-extrabold mb-2 mt-2 ${boldFont.className}`}> Generate PNG</button>
          </span>

          <span className="mr-2">
            <button onClick={() => handlerGenerateCode()} className={`text-nm p-2 text-[#1c1c1c] bg-[#f564c5] cursor-pointer hover:bg-[#be3f94] font-extrabold mb-2 mt-2 ${boldFont.className}`}> Share code</button>
          </span>

          </div>  


        </div>
          



        <footer className="bg-[#cdf564] w-full  text-gray-900 py-4 px-6 text-center font-extrabold">
          <p className="text-sm">
            This is a free tool made by a fan for the FGC / 2XKO community. All rights reserved for Riot Games © 2024
          </p>


        </footer>
    </main>
  );
}
