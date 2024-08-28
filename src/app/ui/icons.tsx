import { CommandIconObject, CommandTextObject } from "../scripts/definitions";
import { boldFont } from "./fonts";


interface CommandIconProps{
    src : string;
    w? : number;
    h? : number;
    alt?: string;
    style?: string;
}

interface CommandTextProps{
  text : string;
  style?: string;
}


export function CommandIcon({src, w =82, h=82, alt, style } : CommandIconProps) {
    
    const CommandObject : CommandIconObject = {
      node: <img src={src} width={w} height={h} style={{maxWidth:`${w/2}px`, maxHeight:`${h/2}px`}} alt={alt}/>,
      size : w,
      style : style

    }

    return (
      CommandObject
    )
}

export function CommandText({text, style } : CommandTextProps) {

  const CommandObject : CommandTextObject = {
    node: <div className="flex items-center justify-center  h-full"> <p className={`text-lg md:text-2xl  ${boldFont.className}`}>{text}</p></div>,
    style : style

  }

  return (
    CommandObject
  )
}