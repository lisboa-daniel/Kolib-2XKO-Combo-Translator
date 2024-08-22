'use client';

import Image from "next/image";
import {COMMANDS, generateIcons, translateCombo} from '@/app/scripts/translator';
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { CommandIconObject, CommandObject, CommandObjectList } from "./scripts/definitions";
import { Box, Button, FormControlLabel, FormGroup, Modal, SvgIcon, Switch, Typography } from "@mui/material";
import Title from "./ui/title";
import localFont from "next/font/local";
import domToImage from 'dom-to-image-more';
import { saveAs } from 'file-saver';
import { GenerateComboCode } from "./scripts/utils";
import AddIcon, { AddCircle, AddCircleOutline, Delete, Download, Edit, Share } from '@mui/icons-material';





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

const style2 = {
  position: 'absolute' as 'absolute',
  top: '42%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'autox',
  height: '200px',
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
  let [ignoreDot, setIgnoreDot] = useState(false)
  const [wrap, setWrap] = useState(false)
  const [renameInput, setRenameInput] = useState('');

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


  const [openRename, setOpenRename,] = useState(false);
  const handleOpenRename = () => {
    setRenameInput(comboLines[activeLine].name);
    setOpenRename(true);
  }
  const handleCloseRename = () => setOpenRename(false);
  
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
    name: 'Default row',
    sequence: []
  }]);

  const handlerAddRow = () => {
    setComboLines( [...comboLines, {
      
      name: `newline ${(comboLines.length-1).toString()} ${new Date().toLocaleString()}`,
      sequence: []
    }])

    inputHistory.push('');
    setActiveLine(comboLines.length);
    
  }  

  const handlerDeleteRow = (name : string) => {
    if (comboLines.length > 1){
      setComboLines(comboLines.filter(line => line.name != name))
      setInputHistory(inputHistory.filter(input => input != inputHistory[activeLine]));
  
      setActiveLine(comboLines.length>1 ? activeLine-1 : comboLines.length-1);
      setActiveLine(activeLine<0? 0 : activeLine )
    } else {
      window.alert("Can't delete, theres only one row left")
    }

    
  } 


  const handlerChangeActiveLine = (idx : number) =>{
    console.log(`inputHistory[idx] = ${inputHistory[idx]}`)
    setComboInput(inputHistory[idx]);
    setActiveLine(idx);

  }

  const handlerRenameLine = (name : string ) => {
    let copy = comboLines;
    copy[activeLine].name = name;

    setComboLines(copy);
    handleCloseRename();

  }

  const testNode = (
    <div> 
    <img src="/commands/medium_attack.svg"></img>
    <img src="/commands/light_attack.svg"></img>
    </div>
  )
   
  const [svgResult, setSvgResult] = useState();

  function filter(node : any) {
    console.log(node.tagName)
    return node.tagName  !== 'SPAN';
  }


  const handlerGeneratePng = async () => {
    let test : Node = (document.getElementById(comboLines[activeLine].name) as Node);

    /*setSvgResult(await domToImage.toPng(test, {filter: filter, copyDefaultStyles: false, bgcolor: 'transparent', style: {
        border: 'none',
        marginLeft: '2px'
    }}));*/

    await domToImage.toBlob(test, {filter: filter, copyDefaultStyles: false, bgcolor: 'transparent', style: {
      border: 'none',
      marginLeft: '2px'
  }}).then(function (blob : Blob) {
    saveAs(blob, `combo: ${new Date().toLocaleDateString()}_${GenerateComboCode()}.png`);
  });


  }



  function handlerGenerateCode(): void {
    window.alert("Function not implemented.");
  }



  function handlerIgdotChange(value : boolean){
    setIgnoreDot(value);
  }

  useEffect( () => {
    handleClick(comboInput);
  },[ignoreDot, useD])


  


  
  return (
    <main className="text-sm md:text-nm flex  w-full flex-col items-start justify-between pl-2 pr-2 md:pl-24 md:pr-24  pb-12">
      <div className="left-0 flex flex-row w-full items-start justify-center h-[170px] z-50 fixed bg-[#0e0e0e] ">

        <img src="/logo.svg" alt="logo" className="bg-white p-[1px] w-[48px] md:w-[64px] mt-6  md:mt-3 mr-2 ml-2 rounded-xl "/>

        <Title text="2XKO Combo Translator" style=" text-center text-xl md:text-4xl mt-8" />
        <p className="text-left mt-8">&nbsp;alpha v.0.1</p>
      </div>

     
        <div id="form" className="flex flex-col w-[95%] md:w-[86%] top-[10%] fixed z-50">  
            <label className="text-[#1c1c1c] w-[120px] pl-1 pr-1 text-left text-sm mt-5 font-extrabold bg-[#cdf564]">Combo recipe</label> 
            <div className="flex flex-row items-center justify-between">
              <input value={comboInput} id="combo_input" className={'w-full text-sm md:text-xl p-2 '} defaultValue={comboInput} onChange={(e) => realTimeUpdate(e.target.value)} name="combo" type="text"/>
              <input className={`text-nm md:text-xl p-2 ml-2 text-[#1c1c1c] bg-[#cdf564] cursor-pointer hover:bg-[#93b63c] font-extrabold ${boldFont.className}`} value={'GO'} type="submit" onClick={() => handleClick(comboInput)}/>
            </div>

            <div className="w-full flex items-end justify-end">
            <button className={`text-sm md:text-nm p-2 text-[#1c1c1c] bg-[#cdf564] cursor-pointer hover:bg-[#93b63c] font-extrabold ${boldFont.className} mt-2  items-end`} onClick={handleOpen}>Command List</button>
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


            <Modal
              open={openRename}
              onClose={handleCloseRename}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
              <Box sx={style2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                <Title text="Rename" style=" text-center text-4xl " />
                </Typography>
                <Typography id="modal-modal-description" className="flex flex-col" sx={{ mt: 2 }}>
                  <label>New name</label>
                    
                  <input defaultValue={renameInput} onChange={(e) => setRenameInput(e.target.value)} className="mr-2" type="text"/>
                   
                  

                  <span className="flex flex-row p-2 items-end justify-end">
                  <button onClick={() => handlerRenameLine(renameInput)} className={`text-nm p-2 mr-2 text-[#1c1c1c] bg-[#cdf564] cursor-pointer hover:bg-[#93b63c] font-extrabold mb-2 mt-2 ${boldFont.className}`}>Rename</button>
                  <button onClick={handleCloseRename} className={`text-nm p-2 text-[#1c1c1c] bg-[#f57a64] cursor-pointer hover:bg-[#c95642] font-extrabold mb-2 mt-2 ${boldFont.className}`}>Cancel</button>
                  </span>
                  
                
                </Typography>
              </Box>
            </Modal>
          
          {/*  test render  */}
          {/*
          <div className="mt-[180px] w-full">
            <p>render:</p>
          {
            svgResult && (
              <img width="100%" src={svgResult} />
            )
          }</div>*/}

        
        {/* settings  */}
        <div id="settings" className="flex w-full flex-col mt-[180px]">
        <label className="text-left text-nm md:text-xl mt-5 font-extrabold">Settings</label>

        {}
        <FormGroup >
          <FormControlLabel control={
            <Switch
            size="medium"
            checked={useD}
            onChange={(e) => setUseD(e.target.checked)}
             inputProps={{ 'aria-label': 'Use Dash as D button on icon display' }
             }/>} 
            
            label={<Typography className="text-sm md:text-nm">Use Dash as D button</Typography>}
            
            
            />
          

          <FormControlLabel control={
            <Switch
            className="text-sm md:text-nm"
            checked={ignoreDot}
            onChange={(e) => handlerIgdotChange(e.target.checked)}
             inputProps={{ 'aria-label': 'Ignore dot' }
             }/>} 
            
             label={<Typography className="text-sm md:text-nm">Ignore dots</Typography>}

          />
          <FormControlLabel 
          className="hidden" 
          control={
            <Switch
            
            checked={wrap}
            onChange={(e) => setWrap(e.target.checked)}
             inputProps={{ 'aria-label': 'Ignore dot' }
             }/>} 
            
             label={<Typography className="text-sm md:text-nm">Wrapline on combo display</Typography>}
            
            
            />
          

        </FormGroup>

        {/*        results          */}
        </div>


        <div id="result" className="p-0 m-0 mt-2">
        <label className="text-left text-sm md:text-xl font-extrabold">Combo translation: </label>
          <p>
            {comboTranslation}
          </p>
        </div>

        <div id="image_results" className="flex flex-col w-full mt-2 mb-2 ">
  
            {
              //render the combo lines
              comboLines.map((line, index) => (
                <div className="flex flex-col" key={index}>

                  <div className='flex flex-row'>
                    

                    
                  <span className="mr-2">
                      <button onClick={() => handlerAddRow()} className={`flex flex-row items-center text-nm p-2 text-[#1c1c1c] bg-[#cdf564] cursor-pointer hover:bg-[#93b63c] font-extrabold mb-2 mt-2 ${boldFont.className}
                      ${
                      
                        comboLines[activeLine] && comboLines[activeLine].name == line.name ? '' :'hidden'
                        
                        
                        }
                      
                      `}> <AddCircle/> <label className="text-sm md:flex hidden ">New row</label></button>
                    </span>
                    <span className="mr-2">

                    <button className={` flex flex-row items-center text-xs md:text-sm p-2 text-[#1c1c1c] bg-[#f56464] cursor-pointer hover:bg-[#a13535] font-extrabold ${boldFont.className} w-[auto] mt-2   ${ comboLines[activeLine] && comboLines[activeLine].name == line.name ? '' :'hidden'}`} onClick={() => handlerDeleteRow(line.name)}><Delete/> <label className="text-sm md:flex hidden ">Delete</label></button>
                    </span>  


                    <span className="mr-2">

                    <button  className={` flex flex-row items-center text-xs md:text-sm p-2 text-[#1c1c1c] bg-[#64d3f5] cursor-pointer hover:bg-[#398da7] font-extrabold ${boldFont.className} w-[auto] mt-2  ${
                      
                      comboLines[activeLine] && comboLines[activeLine].name == line.name ? '' :'hidden'
                      
                      
                      }`} onClick={handleOpenRename}><Edit/><label className="text-sm md:flex hidden ">Rename</label></button>
                    </span>



                    <span className="mr-2">
                      <button onClick={() => handlerGeneratePng()} className={`flex flex-row items-center text-xs md:text-nm p-2 text-[#1c1c1c] bg-[#7264f5] cursor-pointer hover:bg-[#392e96] font-extrabold mb-2 mt-2 ${boldFont.className}
                      ${
                      
                        comboLines[activeLine] && comboLines[activeLine].name == line.name ? '' :'hidden'
                        
                        
                        }
                      `} aria-label="Download png"> <Download/><label className="text-sm md:flex hidden ">Download png</label> </button>
                    </span>

                    <span className="mr-2">
                      <button onClick={() => handlerGenerateCode()} className={`flex flex-row items-center text-xs md:text-nm p-2 text-[#1c1c1c] bg-[#f564c5] cursor-pointer hover:bg-[#be3f94] font-extrabold mb-2 mt-2 ${boldFont.className}
                      
                      ${
                      
                        comboLines[activeLine] && comboLines[activeLine].name == line.name ? '' :'hidden'
                        
                        
                        }
                      `}> <Share/><label className="text-sm md:flex hidden ">Share code</label></button>
                    </span> 
                  </div>



                <button onClick={() => handlerChangeActiveLine(

                  comboLines.findIndex(l => l.name == line.name)
                
                
                
                )} id="default-row" className="mb-4 bg-[#33353c] hover:bg-[#52555f]" 
                
                >
                
                <p className={`mb-2 text-sm md:text-xl font-extrabold text-left p-2 ${comboLines[activeLine] && comboLines[activeLine].name == line.name ? 'text-[#cdf564]' :''} `}>{line.name}</p>  

                
                

                  <div id={line.name} className={`w-full p-2 bg-[#33353c] flex flex-wrap md:flex-nowrap md:flex-row h-min-12 items-start justify-start border-0 border-black`}>
                  
                  {
                      
                    line.sequence.map((cmd, index) => (
                        
                           <div className="border-0 mr-2"> {cmd.node} </div>
                      ))
                  }
                  </div>
      
      
      
                </button>

                </div>
              ))
              
            }  

          <div className="flex flex-row">
          


          </div>  
          
          

          <footer className="bg-[#cdf564] w-full  text-gray-900 py-4 px-6 text-center font-extrabold">
          <p className="text-sm">
            This is a free tool made by a fan for the FGC / 2XKO community. All rights is reserved for Riot Games © 2024
          </p>

          <p className="text-sm">
            Made by: @ dandy_kyun on Twitter and Discord
          </p>


        </footer>
        </div>
          



       
    </main>
  );
}
