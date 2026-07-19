const XLSX = require("xlsx");

function readExcel(filepath, sheetName) {
  const workbook = XLSX.readFile(filepath);

  const sheet = sheetName
    ? workbook.Sheets[sheetName]
    : workbook.Sheets[workbook.SheetNames[0]];

  if (!sheet) {
    throw new Error(
      `Sheet not found: ${sheetName || "(first sheet)"} in ${filepath}`
    );
  }

  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

module.exports = { readExcel };