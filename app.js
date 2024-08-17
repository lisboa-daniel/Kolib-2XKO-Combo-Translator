const combo_dict = {
    "movement": {
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

    "offensive": {
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

    "tag": {
        "t": "tag launcher",
        "(t)": "quick tag",
        "ft": "assist action 1",
        "bt": "assist action 2",    
    }
}

const image_dict = {
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
    ",": "arrow.svg", // Arrow image for commas
    ">": "arrow.svg"  // Arrow image for greater than symbol
}

let combo_array = [];

function findCommand(key) {
    for (const category in combo_dict) {
        if (combo_dict[category].hasOwnProperty(key)) {
            return combo_dict[category][key];
        }
    }
    return null; 
}

function update_images() {
    const imagesDiv = document.getElementById("images");
    imagesDiv.innerHTML = ""; // Clear the previous images

    combo_array.forEach(command => {
        let imageName = image_dict[command]; // Direct lookup in image_dict

        if (imageName) {
            const img = document.createElement("img");
            img.src = `./images/${imageName}`; // Adjust the path to where your images are stored
            img.alt = command;
            img.className = "combo_icon"; // Add the CSS class

            imagesDiv.appendChild(img);
        } else {
            console.log(`No image found for command: ${command}`);
        }
    });
}

function translate_combo() {
    const combo_string = document.getElementById("combo").value.toLowerCase(); 
    const r = document.getElementById("result");

    let result_str = "";
    let i = 0;
    let inQuotes = false;

    combo_array = []; // Clear previous commands at the start of the function

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
                if (char === "," || char === ">") {
                    combo_array.push(char); // Store the arrow symbol as a command
                }

                result_str += char; // Handle unrecognized characters
            }
        }

        // Handle special characters
        if (char === " " || char === ">") {
            result_str += " ";
        } else if (char === ",") {
            // Do nothing; handle comma by replacing it later
        }

        i++;
    }

    // Replace all commas and ">" with " → " and trim any extra spaces
    result_str = result_str.replace(/,/g, " → ").replace(/>/g, " → ").trim();

    r.innerHTML = result_str;
    update_images(); // Update the images based on the newly reset combo_array
}
