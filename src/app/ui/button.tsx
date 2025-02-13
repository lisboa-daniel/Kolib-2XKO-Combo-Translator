import { ReactNode } from "react";
import { boldFont } from "./fonts";


interface ButtonProps {
  label : string;
  onClickHandler? : (args? : any) => void;
  visible? : boolean;
  icon? : ReactNode;
  className?: string;
  bg?: string;
  bgHover?: string;
  color? : string;

}

export default function Button(
  {
    label, 
    onClickHandler, 
    visible=true, 
    icon,
    className,

  } : ButtonProps){

  
  const isIconDefined = icon !== undefined;

  return(
    <button onClick={onClickHandler} className={`flex justify-center items-center p-2 text-[#1c1c1c]  cursor-pointer font-extrabold mb-2 mt-2 ${boldFont.className}
    ${visible ? '' :'hidden'} ${className}`}> 
      {icon} 
      
      <label className={`md:ml-1  cursor-pointer ${isIconDefined ? 'hidden md:flex' : 'flex'}`}>{label}</label>

    </button>
  );
}