const path = require("path");
const { readExcel } = require("./excel");
const { readCSV } = require("./csv");

function readData(filepath, sheetName) {
  const extension = path.extname(filepath).toLowerCase();

  switch (extension) {
    case ".xlsx":
      return readExcel(filepath, sheetName);

    case ".csv":
      return readCSV(filepath);

    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
}

module.exports = { readData };