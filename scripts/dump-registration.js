const { readExcel } = require("../utils/excel");
const { readCSV } = require("../utils/csv");

const excelRows = readExcel("data/registration-data.xlsx");
const csvRows = readCSV("data/registration-data.csv");

console.log("Excel rows:");
console.log(excelRows);

console.log("\nTotal Excel rows:", excelRows.length);

console.log("\nCSV rows:");
console.log(csvRows);

console.log("\nTotal CSV rows:", csvRows.length);