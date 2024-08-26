import { ReactNode } from "react";
export type CommandObject = CommandIconObject | CommandTextObject;

export interface CommandIconObject {
  node : ReactNode,
  size: number,
  style?: string,
}

export interface CommandTextObject {
  node: ReactNode,
  style?: string,
}


export interface Command {
  key : string,
  icon? : string,
  alias : string[],
  alt : string
}

export interface TranslationSettings {
  igDot : boolean,
  useD : boolean,
}

export interface CommandObjectList{
  name : string,
  sequence: CommandObject[]
}