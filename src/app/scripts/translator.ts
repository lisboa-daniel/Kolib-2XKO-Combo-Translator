import { ReactNode } from "react";
import { CommandIcon } from "../ui/icons";

export type ComboCategory = {
    [key: string]: string;
};

export type ComboDict = {
    movement: ComboCategory;
    offensive: ComboCategory;
    tag: ComboCategory;
};

export const combo_dict: ComboDict = {
    movement: {
        "d": "down",
        "f": "forward",
        "b": "backward",
        "u": "upward",
        "j": "jump",
        "uf": "up forward",
        "ub": "up backward",
        "df": "down forward",
        "db": "down backward",
        "uj": "super jump",
        "ff": "forward dash",
        "bb": "backward dash",
        "bbd": "wave dash",
    },
    offensive: {
        "l": "light attack",
        "m": "medium attack",
        "h": "high attack",
        "dfh": "launcher",
        "s1": "special 1",
        "s2": "special 2",
        "mh": "throw",
        "(h)": "critical strike",
        "\\dh": "cross-up",
    },
    tag: {
        "t": "tag launcher",
        "(t)": "quick tag",
        "ft": "assist action 1",
        "bt": "assist action 2",
    }
};

export type ImageDict = {
    [key: string]: string;
};

export const image_dict: ImageDict = {
    "b": "backward.svg",
    "f": "forward.svg",
    "d": "crounch.svg",
    "u": "upward.svg",
    "df": "down_forward.svg",
    "uf": "up_forward.svg",
    "db": "down_backward.svg",
    "ub": "up_backward.svg",
    "h": "high_button.svg",
    "m": "medium_button.svg",
    "l": "light_button.svg",
    "t": "team_button.svg",
    "s1": "special1.svg",
    "s2": "special2.svg", 
    ",": "arrow.svg", 
    ">": "arrow.svg",
    "+": "plus.svg",
    ".": "dot.svg",
    "j": "upward.svg"
};

function findCommand(key: string): string | null {
    for (const category in combo_dict) {
        if (combo_dict[category as keyof ComboDict].hasOwnProperty(key)) {
            return combo_dict[category as keyof ComboDict][key];
        }
    }
    return null;
}

export function generateIcons(combo_array : string[]): ReactNode[] {
    let icons : ReactNode[] = [];

    combo_array.forEach(command => {
        const imageName = image_dict[command]; // Direct lookup in image_dict

        if (imageName) {
            interface CustomSizeDict {
                [key: string]: number;
              }
              
              // Create the dictionary with the defined type
              const customSizeDict: CustomSizeDict = {
                ",": 32,
                ">": 32,
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
                "+": 52,
                ".": 42,
                "j": 42,
                
                
                
                
              };

            const customSize: number | undefined = customSizeDict[command];

            icons.push(CommandIcon(
                {
                    src:`./commands/${imageName}`, 
                    alt: command,
                    w: (customSize) ? customSize : 82, h: (customSize) ? customSize : 82}
                ));
        } else {
            console.log(`No image found for command: ${command}`);
        }
    });

    return icons;
}

export function translateCombo(comboInput : string): [string, string[]] {


    if (!comboInput) return ['',[]];

    const combo_string = comboInput.toLowerCase(); 
    let combo_array : string[] = [];

    let result_str = "";
    let i = 0;
    let inQuotes = false;

    while (i < combo_string.length) {
        let char = combo_string[i];

        if (char === '"') {
            inQuotes = !inQuotes;
            i++;
            continue;
        }

        if (inQuotes) {
            result_str += char;
        } else {
            let foundCommand = false;

            for (let length = 3; length > 0; length--) {
                let commandAttempt = combo_string.slice(i, i + length);
                let command = findCommand(commandAttempt);

                if (command) {
                    result_str += command;
                    combo_array.push(commandAttempt); // Store the raw command
                    i += length - 1; // Move index forward by the length of the found command
                    foundCommand = true;
                    break;
                }
            }

            if (!foundCommand) {
                // Special handling for commas and greater-than symbols
                if (char === "," || char === ">" || char === "+" || char == '.') {
                    combo_array.push(char); // Store the arrow symbol as a command
                }

                result_str += char; // Handle unrecognized characters
            }
        }

        // Handle special characters
        if (char === " " || char === ">" || char === "+" || char == '.') {
            result_str += " ";
        } else if (char === ",") {
            // Do nothing; handle comma by replacing it later
        }

        i++;
    }

    // Replace all commas and ">" with " → " and trim any extra spaces
    result_str = result_str.replace(/,/g, " → ").replace(/>/g, " → ").trim();

    return [result_str, combo_array];
}
