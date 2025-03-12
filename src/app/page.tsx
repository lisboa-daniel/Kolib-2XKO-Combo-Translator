'use client';

import { ChangeLog, Command, CommandObject, CommandObjectList, CommandObjectListInit } from "./scripts/definitions";
import { generateIcons, translateCombo} from '@/app/scripts/translator';
import { CompressCombo, DecompressCombo, GenerateComboCode } from "./scripts/utils";
import { useEffect, useState } from "react";


import { Box, FormControlLabel, FormGroup, Modal, Switch, Typography } from "@mui/material";

import Title from "./ui/title";
import { AddCircle, Circle, Delete, Download, Edit, GitHub, Share, Square } from '@mui/icons-material';

import {boldFont} from "@/app/ui/fonts";

import domToImage from 'dom-to-image-more';
import { saveAs } from 'file-saver';
import Button  from "./ui/button";
import { COMMANDS } from "./scripts/dict";
import ZoomSlider from "./ui/zoomSlider";
import { useRouter, useSearchParams } from 'next/navigation';
import { CHANGELOG, VERSION } from "./scripts/changelog";
import { CommandIcon } from "./ui/icons";

export default function Home() {



  const retrieveParams = () => {
    const queryParameters = useSearchParams();
    const shareInput = queryParameters.get("share")
    return shareInput ? DecompressCombo(shareInput) : 'd.L > 5L > 5M > 5H > S1> S1 > ff >  5H > 5M > df.H>j.H> m>s2'
  }
 

  //Control variables
  const [activeLine, setActiveLine] = useState(0);
  const [comboLines, setComboLines] = useState<CommandObjectList[]> ([
    CommandObjectListInit('Default Row', [])
  ]);

  /*Form Fields handlers*/ 
  const initialCombo = retrieveParams();
  const [comboInput, setComboInput] = useState(initialCombo);
  const [commandCombo, setCommandCombo] = useState<CommandObject[]>([]);
  const [comboTranslation, setComboTranslation] = useState('');
  const [useD, setUseD] = useState(true);
  let [ignoreDot, setIgnoreDot] = useState(false)
  const [ig5, setIg5] = useState(true)
  const [renameInput, setRenameInput] = useState('');
  const [inputHistory, setInputHistory] = useState<string[]>([initialCombo]);


  // Modal Handlers
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openRename, setOpenRename] = useState(false);
  const [openChange, setOpenChange] = useState(false);

    const handleOpenRename = () => {
    setRenameInput(comboLines[activeLine].name);
    setOpenRename(true);
  }
  
  const handleCloseRename = () => setOpenRename(false);

  // Field Handlers
  const [zoomValue, setZoomValue] = useState(1.5);

  const onChangeComboInput = (comboInput : string) => {

  let prevInput = inputHistory;

  prevInput[activeLine] = comboInput;

  setInputHistory(prevInput);

  setComboInput(comboInput);
  handleClick(comboInput);
  }  

  // Button handlers
    const handlerAddRow = () => {
    setRowCounter(rowCounter+1);

    setComboLines( [...comboLines,  
      CommandObjectListInit(`New Combo ${(rowCounter).toString()}`, [])])

    inputHistory.push('');
    setActiveLine(comboLines.length);
    
  }  

  const handlerDeleteRow = (id : string) => {
    if (comboLines.length > 1){
      setComboLines(comboLines.filter(line => line.id != id))
      setInputHistory(inputHistory.filter(input => input != inputHistory[activeLine]));
  
      setActiveLine(comboLines.length>2 ? activeLine-1 : comboLines.length-2);

      console.log(`pid: 39, comboLines.length = ${comboLines.length}`)
      //setActiveLine(activeLine<0? 0 : activeLine )
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


  //Process translation
  const handleClick = (comboInput: string) => {
  const [comboText, comboArray] =  translateCombo(comboInput, {
    igDot: ignoreDot,
    useD: useD,
    ig5: ig5,
    size : zoomValue
  });

  
  let iconCombo = generateIcons(comboArray, zoomValue);

  setCommandCombo(iconCombo);
  setComboTranslation(comboText);


  comboLines[activeLine].sequence = iconCombo;


}

  function filter(node : any) {
    console.log(node.tagName)
    return node.tagName  !== 'SPAN';
  }
  const handlerShareCode = async () => {

    
    try{
      const copy = await handleCopy();
      if (copy)
        return window.alert("Code copied");
    } catch (err){
      return window.alert(`Copy failled contact support ${err}`);
    }
    
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


  function handlerIgdotChange(value : boolean){
    setIgnoreDot(value);
  }

  const handleCopy = async () => {
    try {


      await navigator.clipboard.writeText(window.location.origin+'?share='+ CompressCombo(comboInput));
      //console.log('Copied to clipboard:', CompressCombo(comboInput));
      return true;
    } catch (error) {
      console.error('Unable to copy to clipboard:', error);
      throw error;
    }
  };


  /* effect change igdot and useD*/
  useEffect( () => {
    handleClick(comboInput);
  },[ignoreDot, useD, ig5, zoomValue])


  
  const [convert, setConvert] = useState(false);

  /*
  function convertInputTo(): void {
    setConvert(!convert)
    const clone = comboInput.split(',');
    let i = 0;

    const directionAlias = ['f','b','u','d','ff','bb','dd','uf','ub','df','db']


    while(i < clone.length){
      const findAlt : Command | undefined = COMMANDS.find(
        cmd => (directionAlias.findIndex(dir => dir == cmd.key) != -1));
      
      if (!convert){
        if (findAlt){
          clone[i] =  findAlt.alt;
        }
      }

        i++;
    }
    
    setComboInput(clone.toString());
    
  }*/


  let [rowCounter, setRowCounter] = useState(0);

  return (
    <main className="text-sm md:text-nm flex  w-full flex-col items-start justify-between pl-2 pr-2 md:pl-24 md:pr-24  pb-12">
      <div className="left-0 flex flex-row w-full items-start justify-center h-[170px] z-50 fixed bg-[#0e0e0e] ">

        <img src="/logo.svg" alt="logo" className="bg-white p-[1px] w-[48px] md:w-[64px] mt-6  md:mt-3 mr-2 ml-2 rounded-xl "/>

        <Title text="2XKO Combo Translator" style=" text-center text-xl md:text-4xl mt-8" />
        <p className="text-left mt-8">&nbsp;{VERSION}</p>
      </div>

     
        <div id="form" className="flex flex-col w-[95%] md:w-[86%] top-[10%] fixed z-50">  
            <label className="text-[#1c1c1c] w-[120px] pl-1 pr-1 text-left text-sm mt-5 font-extrabold bg-green-500">Combo recipe</label> 
            <div className="flex flex-row items-center justify-between">

              <input value={comboInput} id="combo_input" className={'outline-none w-full text-sm md:text-xl p-2 '} defaultValue={comboInput} onChange={(e) => onChangeComboInput(e.target.value)} name="combo" type="text"/>


              <input className={`text-nm md:text-xl p-2 ml-2 text-[#1c1c1c] bg-green-500 cursor-pointer hover:bg-green-600 font-extrabold ${boldFont.className}`} value={'GO'} type="submit" onClick={() => handleClick(comboInput)}/>
            </div>

            <div className="w-full flex flex-row items-center justify-end">

                <div className="bg-black">

              
                  <Button
                    label="Command List"
                    onClickHandler={handleOpen}
                    className=" m-3 items-end bg-green-500 hover:bg-green-600"
                  />  

                </div>

    
                                    
            
  
            </div>

        </div>
       
              {/* commands modal*/}
              <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
              <div className={`
                md:min-w-[800px]
                absolute
                top-[40%]
                left-[50%]
                -translate-x-1/2 -translate-y-1/2
                md:h-[600px]
                h-[600px]
                bg-[#1c1c1c]
                shadow-xl
                p-4
                overflow-y-scroll
                border-2
                border-green-400
              `}>

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
                    <span className=" font-semibold text-[] mr-2">{cmd.key}  {cmd.alt != "" ? 'or ' + cmd.alt : ''}</span>
                    <span className=" flex flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      {cmd.alias.map((word, index) => (
                        <span key={index} className="mr-1">{word} </span>
                      ))}
                      <img width={"52px"} className="pl-2" src={'commands/'+cmd.icon}></img>
                    </span>
                  </li>
                ))}

                <li className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  <span className="font-medium text-gray-700 dark:text-gray-200">anything with ( ) or [ ] can be read as hold</span>
                </li>
              </ul>
                </Typography>
              </div>
            </Modal>


            <Modal
              open={openRename}
              onClose={handleCloseRename}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
              <div className={`
                min-w-[200px]
                md:min-w-[500px]
                absolute
                top-[40%]
                left-[50%]
                -translate-x-1/2 -translate-y-1/2
                min-h-[200px]
                bg-[#1c1c1c]
                shadow-xl
                p-4
                overflow-y-hidden
                border-2
                border-green-400
              `}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                <Title text="Rename" style=" text-center text-4xl " />
                </Typography>
                <Typography id="modal-modal-description" className="flex flex-col" sx={{ mt: 2 }}>
                  <label>New name</label>
                    
                  <input defaultValue={renameInput} onChange={(e) => setRenameInput(e.target.value)} className="mr-2" type="text"/>
                   
                  

                  <span className="flex flex-row p-2 items-end justify-end">
  

                  <Button
                    label="Rename"
                    onClickHandler={() => handlerRenameLine(renameInput)}
                    className="items-end mb-2 mt-2 bg-blue-500 hover:bg-blue-600"
                
                  />  

                  <Button
                    label="Cancel"
                    onClickHandler={() => handleCloseRename()}
                    className="items-end mb-2 mt-2 ml-2 bg-red-500 hover:bg-red-600"
                  />  

                  </span>
                  
                
                </Typography>
              </div>
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
        <div id="settings" className="flex flex-col mt-[180px]">

        <div className="mt-2 mb-2 flex flex-col">
          <p className="text-green-400"><Circle className="w-[12px] h-[12px]"/> Tips</p>
          <div className="ml-5 text-nm tracking-wide">

          <p>You can use quotes (" ") to comment anything you like to add, observations or specific notation, anything!</p>
          <p>To me is more elegant to use ( ) or [ ] for hold buttons but feel free, you can just write "hold" too as a comment.</p>  
          <p>Both numpad and letter "Tekken like" notations for movement is supported. Check more on command list.</p>
          </div>
        </div>

        <label className="text-left text-nm md:text-xl mt-5 font-extrabold">Settings</label>


        <FormGroup >
          <FormControlLabel control={
            <Switch
            size="medium"
            checked={useD}
            onChange={(e) => setUseD(e.target.checked)}
             inputProps={{ 'aria-label': 'Use Dash as D button on icon display' }
             }/>} 
            
            label={<Typography className="text-sm md:text-nm">Use Dash as D button</Typography>}
            className="hover:text-green-500 transition-all hover:pl-1"
            
            />
          

          <FormControlLabel control={
            <Switch
            className="text-sm md:text-nm "
            checked={ignoreDot}
            onChange={(e) => handlerIgdotChange(e.target.checked)}
             inputProps={{ 'aria-label': 'Ignore dots' }
             }/>} 
            
             label={<Typography className="text-sm md:text-nm ">Ignore dots</Typography>}
             className="hover:text-green-500 transition-all hover:pl-1"

          />
          <FormControlLabel  
          control={
            <Switch
          
            checked={ig5}
            onChange={(e) => setIg5(e.target.checked)}
             inputProps={{ 'aria-label': 'Ignore neutral 5' }
             }/>} 
            
             label={<Typography className="text-sm md:text-nm hover:text-green-500 transition-all hover:pl-1">Ignore neutral "5"</Typography>}     
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
                        <Button
                          label="New Row"
                          icon={<AddCircle/>}
                          onClickHandler={() => handlerAddRow()}
                          visible={(comboLines[activeLine] && comboLines[activeLine].name == line.name)}
                          className="bg-green-500 hover:bg-green-600"
                        />
                    </span>

                    <span className="mr-2">
                        <Button
                          label="Rename"
                          icon={<Edit/>}
                          onClickHandler={() => handleOpenRename()}
                          visible={(comboLines[activeLine] && comboLines[activeLine].name == line.name)}
                          className="bg-blue-500 hover:bg-blue-600"

                        />
                    </span>

                    <span className="mr-2">
                        <Button
                          label="Delete"
                          icon={<Delete/>}
                          onClickHandler={() => handlerDeleteRow(line.id)}
                          visible={(comboLines[activeLine] && comboLines[activeLine].name == line.name)}
                          className="bg-red-500 hover:bg-red-600"
                        />
                    </span>

                    <span className="mr-2">
                        <Button
                          label="Download Png"
                          icon={<Download/>}
                          onClickHandler={() => handlerGeneratePng()}
                          visible={(comboLines[activeLine] && comboLines[activeLine].name == line.name)}
                          className="bg-purple-400 hover:bg-purple-500"
                        />
                    </span>

                    <span className="mr-2">
                        <Button
                          label="Share code"
                          icon={<Share/>}
                          onClickHandler={() => handlerShareCode()}
                          visible={(comboLines[activeLine] && comboLines[activeLine].name == line.name)}
                          className="bg-pink-400 hover:bg-pink-500"
                        />
                    </span>


                    <div className="flex flex-col">

                      <label className={`${boldFont.className} w-full justify-center items-center flex flex-row`}>
                      <Typography className={`${boldFont.className} text-sm font-bold md:text-nm text-[#1c1c1c] bg-green-500 p-1 transition-all hover:pl-1`}>Icon Size</Typography>
                      </label>


                      <div className="ml-2 mr-2">
                        <ZoomSlider value={zoomValue} setValue={setZoomValue}/>
                      </div>

                    </div>
                  
                  </div>



                <button onClick={() => handlerChangeActiveLine(

                  comboLines.findIndex(l => l.name == line.name)
                
                
                
                )} id="default-row" className="mb-4 bg-[#33353c] hover:bg-[#52555f]" 
                
                >
                
                <p className={`mb-2 text-sm md:text-xl font-extrabold text-left p-2 ${comboLines[activeLine] && comboLines[activeLine].name == line.name ? 'text-[#cdf564]' :''} `}>{line.name}</p>  

                
                

                  <div id={line.name} className={`w-full p-2 bg-[#33353c] flex flex-wrap min-h-20 items-center justify-start border-0 border-black`}>
                  
                  {
                      
                    line.sequence.map((cmd, index) => (
                        
                            <div className="mt-2 mr-2"> {cmd.node}</div>
                      ))
                  }
                  </div>
      
      
      
                </button>

                </div>
              ))
              
            }  


          <Modal
              open={openChange}
              onClose={() => setOpenChange(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
              
              <div className={`
                min-w-[380px]

                md:min-w-[500px]
                absolute
                top-[40%]
                left-[50%]
                -translate-x-1/2 -translate-y-1/2
                min-h-[200px]
                max-h-[600px]
                overflow-y-scroll
                bg-[#1c1c1c]
                shadow-xl
                p-4
                
                border-2
                border-green-400
              `}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                <Title text="Change Log" style=" text-center text-4xl " />
                </Typography>
                <Typography id="modal-modal-description" className="flex flex-col" sx={{ mt: 2 }}>
                  

                <Button
                    label="Close"
                    onClickHandler={() => setOpenChange(false)}
                    className="items-end mb-2 mt-2 ml-2 bg-red-500 hover:bg-red-600 sticky"
                  />  
                  <ul>
                    {
                      CHANGELOG.map( (log:ChangeLog, index) => (
                        <li key={index} className="font-extrabold mt-2">{log.title}:<br/> 
                          {log.contents.map( (content:string, index) => (
                              <p key={index} className="font-normal text-sm">- {content}</p>
                          ))}
                          
                        </li>
                      ))
                    }
              



                    
                  </ul>


                  
                
                </Typography>
              </div>
            </Modal>  

        <footer className="bg-green-500 w-full text-gray-900 py-4 px-6 text-center font-extrabold text-sm">
          <div className="flex justify-center space-x-4">
          <p className="mt-2">
            This is a free tool made by a fan for the FGC / 2XKO community. 2XKO have all rights reserved for Riot Games © 2024
          </p>
          </div>
  
            <p id="credit" className="w-full justify-center flex flex-row">
            Made by:&nbsp;{CommandIcon({src:"discord_logo.svg", w: 48, h: 48,alt:"bsky", style:""}).node}&nbsp;@dandy_kyun&nbsp; 
             
             
            {CommandIcon({src:"bluesky_logo.svg", w: 48, h: 48,alt:"bsky", style:""}).node}&nbsp;<a className="hover:underline" href="https://bsky.app/profile/dandykyun.bsky.social"> @dandykyun.bsky.social</a>
            </p> 
         

          <div className="flex flex-row justify-center w-full items-center">
            <a href="https://github.com/lisboa-daniel/Kolib-2XKO-Combo-Translator" className="hover:text-white ml-2 underline"><GitHub className="mr-1"/>GitHub Repo</a> <p className="hover:text-white ml-2 cursor-pointer underline" onClick={() => setOpenChange(true)}>  Change Log</p>
          </div>
        </footer>

        {/*<div className="flex flex-row h-2 w-full">
            <div className="w-full bg-blue-500"/>


        </div>  */}
          
        </div>
 
    </main>
  );
}
