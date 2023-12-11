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


const oneMappingToFinalForm = ({destinationRanges, sourceRanges, lengthRanges}) => {
    let returnDict = {};
    const numberOfMappings = destinationRanges.length;

    for (let i = 0; i < numberOfMappings; i++) {
        let mappingNumberOccurences = lengthRanges[i];
        for (let j = 0; j < mappingNumberOccurences; j++) {
            returnDict[sourceRanges[i] + j] = destinationRanges[i] + j;
        }
    }
    return returnDict;
}

const fillNotPresentSources = (mappings) => {
    const maxNumber = Math.max(...Object.keys(mappings));
    for (let i = 0; i < maxNumber; i++) {
        if (!mappings[i]) {
            mappings[i] = i;
        }
    }
    return mappings;
}


const formatMappingsToFinalShape = (mappings) => {
    for (let key of Object.keys(mappings)) {
        let parsedDict = oneMappingToFinalForm(mappings[key]);
        mappings[key]["mappings"] = fillNotPresentSources(parsedDict);
    }
    return mappings;
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
    console.log(1);
    const splittedStrings = splitByValue(input);
    console.log(2);
    const arrays = splitByValue(splittedStrings, " ")[0];
    console.log(3);

    const mappedDicts = mapIntoDict(arrays);
    console.log(4);

    mappedDicts["mappings"] = formatMappingsToFinalShape(mappedDicts["mappings"]);
    console.log(5);

    let lowestLocation = 10000; // just a big number
    
    for (let seed of mappedDicts["seeds"]) {
        let currentValue = seed;
        for (let map of mapsOrder) {
            currentValue = mappedDicts["mappings"][map]["mappings"][currentValue];
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