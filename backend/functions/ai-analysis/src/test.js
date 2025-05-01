import { generateMockBPData } from "./utils/generateMockBPData.js";
import { readingsFormatter } from "./utils/readingsFormatter.js";
import { readingsJson } from "./utils/readingsJson.js";

// console.log(generateMockBPData(1))

// const readings = generateMockBPData(30)
// const readingsJson = JSON.stringify(readings)
const parsedJson = JSON.parse(readingsJson, (key, value) => {
  if (key === 'date') return new Date(value)
  else return value
})

console.log(parsedJson)

