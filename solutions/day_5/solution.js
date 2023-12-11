const fs = require('fs');

const readInputFile = (filePath = "input.txt") => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    return lines;
}

const splitByValue = (txtValue, separator = "") => {
    let result = [];
    let new_array = [];
    for (let i = 0; i < txtValue.length; i++) {
        if (txtValue[i] === separator) {
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


const handleOneMapping = (mapping) => {
    let destinationRanges = [];
    let  sourceRanges = [];
    let lengthRanges = [];

    for (let j = 1; j < mapping.length; j++) {
        splittedString = String(mapping[j]).split(" ");
        destinationRanges.push(parseInt(splittedString[0]));
        sourceRanges.push(parseInt(splittedString[1]));
        lengthRanges.push(parseInt(splittedString[2]));
    }

    return {
        [String(mapping[0]).split(" ")[0]]: {
            "destinationRanges": destinationRanges,
            "sourceRanges": sourceRanges,
            "lengthRanges": lengthRanges
        }
    };

}


const mapIntoDict = (arrays) => {
    let mappings = {};

    for (let i = 1; i < arrays.length; i++) {
        mappings = { ...mappings, ...handleOneMapping(arrays[i]) };
    }
    return {
        "mappings": mappings,
        "seeds": String(arrays[0]).split(": ")[1].split(" ").map((x) => parseInt(x))
    };
}

const performMapping = ({sourceValue, destinationRanges, sourceRanges, lengthRanges}) => {
    let returnValue;
    for (let i = 0; i < destinationRanges.length; i++) {
        if (sourceValue >= sourceRanges[i] && sourceValue <= sourceRanges[i] + lengthRanges[i]) {
            returnValue = destinationRanges[i] + sourceValue - sourceRanges[i];
            break;
        }
    }
    return returnValue ? returnValue : sourceValue;
}

const mapsOrder = [
    'seed-to-soil',
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location'
];

const runTask = () => {
    const input = readInputFile();
    const splittedStrings = splitByValue(input);
    const arrays = splitByValue(splittedStrings, " ")[0];
    const mappedDicts = mapIntoDict(arrays);

    let lowestLocation = Infinity; // a very large number
    
    for (let seed of mappedDicts["seeds"]) {
        let currentValue = seed;
        for (let map of mapsOrder) {
            currentValue = performMapping({"sourceValue": currentValue, ...mappedDicts["mappings"][map]});
        }
        if (currentValue < lowestLocation) {
            lowestLocation = currentValue;
        }
    }   

    return lowestLocation;
    
}

function main() {
    const lowestLocation = runTask();
    console.log(lowestLocation);
}

main();