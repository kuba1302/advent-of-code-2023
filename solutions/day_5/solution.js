const fs = require("fs");

const readInputFile = (filePath = "input.txt") => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  return lines;
};

const splitByValue = (txtValue, separator = "") => {
  let result = [];
  let new_array = [];
  for (let i = 0; i < txtValue.length; i++) {
    if (txtValue[i] === separator) {
      if (new_array.length > 0) {
        result.push(new_array);
      }
      new_array = [];
    } else {
      new_array.push(txtValue[i]);
    }
  }
  if (new_array.length > 0) {
    result.push(new_array);
  }
  return result;
};

const handleOneMapping = (mapping) => {
  let destinationRanges = [];
  let sourceRanges = [];
  let lengthRanges = [];

  for (let j = 1; j < mapping.length; j++) {
    splittedString = String(mapping[j]).split(" ");
    destinationRanges.push(parseInt(splittedString[0]));
    sourceRanges.push(parseInt(splittedString[1]));
    lengthRanges.push(parseInt(splittedString[2]));
  }

  return {
    [String(mapping[0]).split(" ")[0]]: {
      destinationRanges: destinationRanges,
      sourceRanges: sourceRanges,
      lengthRanges: lengthRanges,
    },
  };
};

const mapIntoDict = (arrays) => {
  let mappings = {};

  for (let i = 1; i < arrays.length; i++) {
    mappings = { ...mappings, ...handleOneMapping(arrays[i]) };
  }
  return {
    mappings: mappings,
    seeds: String(arrays[0])
      .split(": ")[1]
      .split(" ")
      .map((x) => parseInt(x)),
  };
};

const performMapping = ({
  sourceValue,
  destinationRanges,
  sourceRanges,
  lengthRanges,
}) => {
  let returnValue;
  for (let i = 0; i < destinationRanges.length; i++) {
    if (
      sourceValue >= sourceRanges[i] &&
      sourceValue <= sourceRanges[i] + lengthRanges[i]
    ) {
      returnValue = destinationRanges[i] + sourceValue - sourceRanges[i];
      break;
    }
  }
  return returnValue ? returnValue : sourceValue;
};

const runTask1 = () => {
  const input = readInputFile();
  const splittedStrings = splitByValue(input);
  const arrays = splitByValue(splittedStrings, " ")[0];
  const mappedDicts = mapIntoDict(arrays);

  let lowestLocation = Infinity;

  for (let seed of mappedDicts["seeds"]) {
    let currentValue = seed;
    for (let map of mapsOrder) {
      currentValue = performMapping({
        sourceValue: currentValue,
        ...mappedDicts["mappings"][map],
      });
    }
    if (currentValue < lowestLocation) {
      lowestLocation = currentValue;
    }
  }

  return lowestLocation;
};

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  isEmpty() {
    return this.items.length == 0;
  }
}

const performRangeMapping = ({
  inputRanges,
  destinationRanges,
  sourceRanges,
  lengthRanges,
}) => {
  let queue = new Queue();
  for (let range of inputRanges) {
    queue.enqueue(range);
  }
  let outputRanges = [];

  while (!queue.isEmpty()) {
    const rangeToCheck = queue.dequeue();
    for (let i = 0; i < destinationRanges.length; i++) {
        console.log({rangeToCheck, sourceRange: sourceRanges[i], lengthRange: lengthRanges[i]});

      if (
        (rangeToCheck.lower >= sourceRanges[i] &&
          rangeToCheck.lower <= sourceRanges[i] + lengthRanges[i]) ||
        (rangeToCheck.upper >= sourceRanges[i] &&
          rangeToCheck.upper <= sourceRanges[i] + lengthRanges[i])
      ) {
        let intersectedRange = {
          lower: Math.max(rangeToCheck.lower, sourceRanges[i]),
          upper: Math.min(
            sourceRanges[i] + lengthRanges[i],
            rangeToCheck.upper
          ),
        };
        console.log({intersectedRange: intersectedRange});
        let mappedRange = {
            lower: destinationRanges[i] + (intersectedRange.lower - sourceRanges[i]),
            upper: destinationRanges[i] + (intersectedRange.upper - sourceRanges[i]),
          };
        outputRanges.push(mappedRange);

        if (!(rangeToCheck.lower >= intersectedRange.lower && rangeToCheck.upper <= intersectedRange.upper)) {
            
          if (rangeToCheck.lower < intersectedRange.lower) {
            queue.enqueue({
              lower: rangeToCheck.lower,
              upper: intersectedRange.lower,
            });
          }
          if (rangeToCheck.upper > intersectedRange.upper) {
            queue.enqueue({
              lower: intersectedRange.upper,
              upper: rangeToCheck.upper,
            });
          }
        }
      }
    }
  }

  return outputRanges ? outputRanges: inputRanges;
};

const mapsOrder = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
];

const runTask2 = () => {
  const input = readInputFile();
  const splittedStrings = splitByValue(input);
  const arrays = splitByValue(splittedStrings, " ")[0];
  const mappedDicts = mapIntoDict(arrays);

  let lowestLocation = Infinity; // a very large number
  const seeds = mappedDicts["seeds"];

  for (let i = 0; i < seeds.length; i += 2) {
    let sourceInputStart = seeds[i];
    let sourceInputRange = seeds[i + 1];

    let currentListOfMappings = [
      {
        lower: sourceInputStart,
        upper: sourceInputStart + sourceInputRange,
      },
    ];
    console.log(currentListOfMappings);
    for (let map of mapsOrder) {
      currentListOfMappings = performRangeMapping({
        inputRanges: currentListOfMappings,
        ...mappedDicts["mappings"][map],
      });
      console.log(currentListOfMappings);
    }
    for (let mapping of currentListOfMappings) {
        if (mapping.lower < lowestLocation) {
          lowestLocation = mapping.lower;
        }
      }
  }

  return lowestLocation;
};

function main() {
  const lowestLocation = runTask2();
  console.log(lowestLocation);
}

main();
