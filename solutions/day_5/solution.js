const fs = require('fs');

function readInputFile(filePath = "input.txt") {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');
  return lines;
}

const splitBySpaces = (txtValue) => {
    result = [];
    new_array = [];
    for (let i = 0; i < txtValue.length; i++) {
        if (txtValue[i] === ""){
            if (new_array.length > 0) {
                result.push(new_array);
            }
            new_array = [];
            }
        else {
            new_array.push(txtValue[i]);
        }
    }
    if (new_array.length > 0) {
        result.push(new_array);
    }
    return result;
}

const readIntoArrays = (splittedStrings) => {
    
}


function main() {
    const input = readInputFile();
    console.log(splitBySpaces(input));
}

main();