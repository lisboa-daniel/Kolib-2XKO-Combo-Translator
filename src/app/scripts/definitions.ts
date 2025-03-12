import { ReactNode } from "react";
import { GenerateComboCode } from "./utils";
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
  ig5: boolean,
  size : number
}

export interface CommandObjectList{
  id : string,
  name : string,
  sequence: CommandObject[]
}

export const CommandObjectListInit = (name : string, sequence : CommandIconObject[]) => {
  return {
    id : GenerateComboCode(),
    name : name,
    sequence : sequence
  }
}


export interface ChangeLog{
  title: string,
  contents: string[],
  date: Date
}