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
    bg='green-500',
    bgHover='green-600'
  } : ButtonProps){

  
  const _bg = `bg-${bg}`;
  const _bgHover = `hover:bg-${bgHover}`;
  const isIconDefined = icon !== undefined;
  return(
    <button onClick={onClickHandler} className={`flex justify-center items-center text-nm p-2 text-[#1c1c1c]  cursor-pointer ${_bg} } ${_bgHover} font-extrabold mb-2 mt-2 ${boldFont.className}
    ${visible ? '' :'hidden'} ${className}`}> 
      {icon} 
      
      <label className={`md:ml-1 text-sm cursor-pointer ${isIconDefined ? 'hidden md:flex' : 'flex'}`}>{label}</label>

    </button>
  );
}