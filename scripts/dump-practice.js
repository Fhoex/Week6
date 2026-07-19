const { readExcel } = require("../utils/excel");
const { readCSV } = require("../utils/csv");

const excelRows = readExcel("data/practice.xlsx");

console.log("Excel rows:");
console.log(excelRows);
console.log(`Total rows: ${excelRows.length}`);

const csvRows = readCSV("data/practice.csv");

console.log("\nCSV rows:");
console.log(csvRows);
console.log(`Total CSV rows: ${csvRows.length}`);