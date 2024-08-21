import { CommandIconObject, CommandTextObject } from "../scripts/definitions";


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

    const minw = `min-w-[${w}]`;
    const minh = `min-h-[${h}]`;
    
    const CommandObject : CommandIconObject = {
      node: <img src={src} width={w} height={h} className={` ${minw} ${minh} mb-2`} alt={alt}/>,
      size : w,
      style : style

    }

    return (
      CommandObject
    )
}

export function CommandText({text, style } : CommandTextProps) {

  const CommandObject : CommandTextObject = {
    node: <p className="mb-2">{text}</p>,
    style : style

  }

  return (
    CommandObject
  )
}