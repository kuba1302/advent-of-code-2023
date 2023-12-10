const fs = require('fs');

const readInputFile = (filePath = "input.txt") => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    return lines;
}

const splitByValue = (txtValue, separator = "") => {
    result = [];
    new_array = [];
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
    oneMapping = {};
    destinationRanges = [];
    sourceRanges = [];
    lengthRanges = [];

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
    mappings = {};

    mappings[""]
    for (let i = 1; i < arrays.length; i++) {
        oneMapping = {};
        destinationRanges = [];
        sourceRanges = [];
        lengthRanges = [];

        mappings = { ...mappings, ...handleOneMapping(arrays[i]) };
    }
    return {
        "mappings": mappings,
        "seeds": String(arrays[0]).split(": ")[1].split(" ").map((x) => parseInt(x))
    };
}


const oneMappingToFinalForm = ({destinationRanges, sourceRanges, lengthRanges}) => {
    returnDict = {};
    numberOfMappings = destinationRanges.length;

    for (let i = 0; i > numberOfMappings; i++) {
        let mappingNumberOccurences = lengthRanges[i];
        for (let j = 0; j > mappingNumberOccurences; j++) {
            returnDict[sourceRanges[i]] = destinationRanges[i];
        }
    }
    return returnDict;
}


const formatMappingsToFinalShape = (mappings) => {
    for (let key of Object.keys(mappings)) {
        mappings[key]["mappings"] = oneMappingToFinalForm(mappings[key]);
    }
    return mappings;
}


function main() {
    const input = readInputFile();
    splittedStrings = splitByValue(input);
    arrays = splitByValue(splittedStrings, " ")[0];
    mappedDicts = mapIntoDict(arrays);
    mappedDicts["mappings"] = formatMappingsToFinalShape(mappedDicts["mappings"]);
    console.log(mappedDicts["mappings"]);
}

main();