import { Command } from "./definitions";

export const COMMANDS: Command[] = [
    // Movement commands
    {
      key: "5",
      icon: "neutral2.svg",
      alias: ["standing"],
      alt: "stand",
    },
    {
      key: "d",
      icon: "crounch.svg",
      alias: ["down"],
      alt: "2",
    },
    {
      key: "f",
      icon: "forward.svg",
      alias: ["forward"],
      alt: "6",
    },
    {
      key: "b",
      icon: "backward.svg",
      alias: ["backward"],
      alt: "4",
    },
    {
      key: "u",
      icon: "upward.svg",
      alias: ["upward"],
      alt: "8",
    },
    {
      key: "j",
      icon: "upward.svg",
      alias: ["jump"],
      alt: "",
    },
    {
      key: "uf",
      icon: "up_forward.svg",
      alias: ["up forward"],
      alt: "9",
    },
    {
      key: "ub",
      icon: "up_backward.svg",
      alias: ["up backward"],
      alt: "7",
    },
    {
      key: "df",
      icon: "down_forward.svg",
      alias: ["down forward"], //might need a new icon
      alt: "3",
    },
    {
      key: "db",
      icon: "down_backward.svg",
      alias: ["down backward"],
      alt: "1",
    },
    {
      key: "dj",
      icon: "super_jump.svg",
      alias: ["super jump"],
      alt: "2j",
    },
    {
      key: "ff",
      icon: "dash.svg", 
      alias: ["forward dash"],
      alt: "66",
    },
    {
      key: "ff2",
      icon: "dash_button.svg", 
      alias: ["forward dash"],
      alt: "66",
    },
    {
      key: "bb",
      icon: "backdash.svg", // might need a specific icon for backward dash
      alias: ["backward dash"],
      alt: "44",
    },
    {
      key: "bb2",
      icon: "backdash_button.svg", // might need a specific icon for backward dash
      alias: ["backward dash"],
      alt: "44",
    },
    {
      key: "bbd",
      icon: "forward.svg", // might need a specific icon for wave dash
      alias: ["wave dash"],
      alt: "442",
    },
  
    // Offensive commands
    {
      key: "l",
      icon: "light_button.svg",
      alias: ["light attack"],
      alt: "",
    },
    {
      key: "m",
      icon: "medium_button.svg",
      alias: ["medium attack"],
      alt: "",
    },
    {
      key: "h",
      icon: "high_button.svg",
      alias: ["high attack"],
      alt: "",
    },
    /*{
      key: "dfh",
      icon: "default_icon.svg", // might need a specific icon for launcher
      alias: ["launcher"],
      alt: "",
    },*/
    {
      key: "s1",
      icon: "special1.svg",
      alias: ["special 1"],
      alt: "",
    },
    {
      key: "s2",
      icon: "special2.svg",
      alias: ["special 2"],
      alt: "",
    },
    /*{
      key: "mh",
      icon: "default_icon.svg", // might specfic icon be added
      alias: ["throw"],
      alt: "",
    },*/
    {
      key: "(h)",
      icon: "critical_strike.svg", // Ymight specfic icon be added
      alias: ["critical strike"],
      alt: "",
    },
    {
      key: "[h]",
      icon: "critical_strike2.svg", // Ymight specfic icon be added
      alias: ["critical strike"],
      alt: "",
    },
    {
      key: "\\dh",
      icon: "cross_up.svg", // might specfic icon be added 
      alias: ["cross-up"],
      alt: "",
    },
  
    // Tag commands
    {
      key: "t",
      icon: "team_button.svg",
      alias: ["tag launcher"], // might specfic icon be added 
      alt: "",
    },
    {
      key: "(t)",
      icon: "team_button_hold.svg", 
      alias: ["quick tag"],
      alt: "",
    },
    {
      key: "[t]",
      icon: "team_button_hold2.svg", 
      alias: ["quick tag"],
      alt: "",
    },
    {
      key: "ft",
      icon: "assist_action1.svg", // might need a specific icon for assist action 1
      alias: ["assist action 1"],
      alt: "6t",
    },
    {
      key: "bt",
      icon: "assist_action2.svg", // might need a specific icon for assist action 2
      alias: ["assist action 2"],
      alt: "4t",
    },
    {
      key: "+",
      icon: "plus.svg",
      alias: ["+"],
      alt: "",
    },
    {
      key: ".",
      icon: "dot.svg",
      alias: ["."],
      alt: "",
    },
    {
      key: ">",
      icon: "arrow.svg",
      alias: ["→",">"],
      alt: "",
    },
    {
      key: ",",
      icon: "arrow.svg",
      alias: ["→",">"],
      alt: "",
    },
    /*{
      key: "(",
      icon: "open_pam.svg",
      alias: ["("],
      alt: "",
    },
    {
      key: ")",
      icon: "close_pam.svg",
      alias: [")"],
      alt: "",
    },
    {
      key: "[",
      icon: "open_pam2.svg",
      alias: ["["],
      alt: "",
    },
    {
      key: "]",
      icon: "close_pam2.svg",
      alias: ["]"],
      alt: "",
    },*/

    
];
