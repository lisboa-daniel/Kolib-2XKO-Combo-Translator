
import { ReactNode } from "react";
import { CommandIcon, CommandText } from "../ui/icons";
import { Command, CommandIconObject, CommandObject, CommandTextObject, TranslationSettings } from "./definitions";

export const COMMANDS: Command[] = [
  // Movement commands
  {
    key: "d",
    icon: "crounch.svg",
    alias: ["down"],

  },
  {
    key: "f",
    icon: "forward.svg",
    alias: ["forward"],
  },
  {
    key: "b",
    icon: "backward.svg",
    alias: ["backward"],
  },
  {
    key: "u",
    icon: "upward.svg",
    alias: ["upward"],
  },
  {
    key: "j",
    icon: "upward.svg",
    alias: ["jump"],
  },
  {
    key: "uf",
    icon: "up_forward.svg",
    alias: ["up forward"],
  },
  {
    key: "ub",
    icon: "up_backward.svg",
    alias: ["up backward"],
  },
  {
    key: "df",
    icon: "down_forward.svg",
    alias: ["down forward"], //might need a new icon
  },
  {
    key: "db",
    icon: "down_backward.svg",
    alias: ["down backward"],
  },
  {
    key: "uj",
    icon: "upward.svg",
    alias: ["super jump"],
  },
  {
    key: "ff",
    icon: "dash.svg", 
    alias: ["forward dash"],
  },
  {
    key: "ff2",
    icon: "dash_button.svg", 
    alias: ["forward dash"],
  },
  {
    key: "bb",
    icon: "backward.svg", // might need a specific icon for backward dash
    alias: ["backward dash"],
  },
  {
    key: "bbd",
    icon: "forward.svg", // might need a specific icon for wave dash
    alias: ["wave dash"],
  },

  // Offensive commands
  {
    key: "l",
    icon: "light_button.svg",
    alias: ["light attack"],
  },
  {
    key: "m",
    icon: "medium_button.svg",
    alias: ["medium attack"],
  },
  {
    key: "h",
    icon: "high_button.svg",
    alias: ["high attack"],
  },
  /*{
    key: "dfh",
    icon: "default_icon.svg", // might need a specific icon for launcher
    alias: ["launcher"],
  },*/
  {
    key: "s1",
    icon: "special1.svg",
    alias: ["special 1"],
  },
  {
    key: "s2",
    icon: "special2.svg",
    alias: ["special 2"],
  },
  /*{
    key: "mh",
    icon: "default_icon.svg", // might specfic icon be added
    alias: ["throw"],
  },*/
  {
    key: "(h)",
    icon: "critical_strike.svg", // Ymight specfic icon be added
    alias: ["critical strike"],
  },
  {
    key: "\\dh",
    icon: "cross_up.svg", // might specfic icon be added 
    alias: ["cross-up"],
  },

  // Tag commands
  {
    key: "t",
    icon: "team_button.svg",
    alias: ["tag launcher"], // might specfic icon be added 
  },
  {
    key: "(t)",
    icon: "team_button_hold.svg", 
    alias: ["quick tag"],
  },
  {
    key: "ft",
    icon: "assist_action1.svg", // might need a specific icon for assist action 1
    alias: ["assist action 1"],
  },
  {
    key: "bt",
    icon: "assist_action2.svg", // might need a specific icon for assist action 2
    alias: ["assist action 2"],
  },
  {
    key: "+",
    icon: "plus.svg",
    alias: ["+"],
  },
  {
    key: ".",
    icon: "dot.svg",
    alias: ["."],
  },
  {
    key: ">",
    icon: "arrow.svg",
    alias: ["→",">"],
  },
  {
    key: ",",
    icon: "arrow.svg",
    alias: ["→",">"],
  },
  {
    key: "(",
    icon: "open_pam.svg",
    alias: ["("],
  },
  {
    key: ")",
    icon: "close_pam.svg",
    alias: [")"],
  },

  
];



function findCommandString(key: string): string | null {
  const command = COMMANDS.find(cmd => cmd.key === key);
  return command ? command.alias[0] : null;
}

function findCommand(key: string): Command | undefined {

  return COMMANDS.find(cmd => cmd.key === key);

}


export function generateIcons(combo_array : Command[]): CommandObject[] {
    let results : CommandObject[] = []
    //let icons : CommandIconObject[] = [];
    //let commandText : CommandTextObject[] = [];

    combo_array.forEach(command => {
        const imageName = command.icon; // direct lookup if theres any icon

        if (imageName) {
            interface CustomSizeDict {
                [key: string]: number;
              }
              
              // insert custom sizes, (temporary solution) needs refactor
              const customSizeDict: CustomSizeDict = {
                ",": 35,
                ">": 35,
                "m": 52,
                "h": 52,
                "l": 52,
                "d": 42,
                "db": 58,
                "df": 58,
                "u": 42,
                "uf": 58,
                "ub": 58,
                "f": 42,
                "b": 42,
                "s1": 52,
                "s2": 52,
                "t": 52,
                "+": 32,
                ".": 42,
                "j": 42,
                "ff": 42,
                "ff2": 52,
                "(t)": 90,
                "bt": 90,
                "ft": 90,
                "(": 16,
                ")": 16,
                "\\dh": 90,
                "(h)": 90
   
              };

            const customSize: number | undefined = customSizeDict[command.key];
            
            //push the icons
            results.push(CommandIcon(
                {
                    src:`./commands/${imageName}`, 
                    alt: command.alias[0],
                    w: (customSize) ? customSize : 82, h: (customSize) ? customSize : 82}
                ));

                console.log(`Image found for command: ${command.alias[0]}`);
        } else {
          //if there's no icon then push a text object
          console.log(`No image found for command: ${command.alias[0]}`);
          results.push(CommandText({
            text: command.alias[0],
            style:''
          }


          ))
            
        }
    });

    return results;
}

export function translateCombo(comboInput : string, settings : TranslationSettings): [string, Command[]] {

    //if nothing on input don't process
    if (!comboInput) return ['',[]];

    const combo_string = comboInput.toLowerCase(); 
    let combo_array : Command[] = [];

    let result_str = ""; //this is the translation in text

    let i = 0; //index for characters

    let inQuotes = false; // controls quotes states

    while (i < combo_string.length) {
        let char = combo_string[i];

        //switch quote state
        if (char === '"') {
            inQuotes = !inQuotes;
            i++;
            continue;
        }

        //inside a quote search behavior
        if (inQuotes) {
          let j = i;
          let temp_quote_word = ''
          while(j < combo_string.length && inQuotes){

            temp_quote_word += combo_string[j]

            j++;

            if (combo_string[j] == '"'){
              inQuotes = false;
              i = j;
            }
          } 
          
          // push the final word
           combo_array.push(
            {
              key:temp_quote_word,
              alias:[temp_quote_word]
            }
          )

            result_str += char;
        } else {
            //if theres no quote try to find a command
            let foundCommand = false;

            for (let length = 3; length > 0; length--) {
                let commandAttempt = combo_string.slice(i, i + length);
                let command = findCommandString(commandAttempt);

                if (command) {
                    result_str += command;
                  
                    //if found generate a command object, but theres a few rules with stupid if elses
                    const commandObject = findCommand(commandAttempt);



                    if (commandObject) {
                      const cmdExceptions = ['.','ff'];
                      if (cmdExceptions.find(cmd => cmd === commandObject.key) != undefined){
                        switch(commandObject.key){
                          case '.':{
                            if (!settings.igDot) {
                              combo_array.push(commandObject);
                            }
                          } break;

                          case 'ff': {
                            if (settings.useD) {
                               const nCommandObject = findCommand('ff2');
                               if (nCommandObject) combo_array.push(nCommandObject);
                              
                            } else combo_array.push(commandObject);
                            
                            
                          } break;
                        }
                      } 
                        else combo_array.push(commandObject);
                      
                      

                      }

                    // store the raw command
                    i += length - 1; // move index forward by the length of the found command
                    foundCommand = true;
                    break;
                }
            }

            if (!foundCommand) {
              //if nothing is found handle special characters and ignore spaces

                // special handling for commas and > symbols
                  if (char === "," || char === ">" || char === "+" || char == '.' )  {
                      combo_array.push({
                        key:char,
                        icon: char,
                        alias: [char]
                  })
                  } else {
                    if (char != " "){
                      combo_array.push(
                        {
                          key:char,
                          alias:[char]
                        }
                      )
                    }
    
                  }
                
                //add whatever it got
                result_str += char; 
            }
        }

        // add a space between (not using anymore)
        /*
        if (char === " " || char === ">" || char === "+" || char == '.' || char== "|") {
            result_str += " ";
        } else if (char === ",") {
            // Do nothing; handle comma by replacing it later
        }*/

       

        i++;
    }

    // replace all commas and ">" with " → " and trim any extra spaces
    result_str = result_str.replace(/,/g, " → ").replace(/>/g, " → ").trim();

    //return text and object with icon, alt, text, etc
    return [result_str, combo_array];
}
