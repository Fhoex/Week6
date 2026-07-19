const fs = require("fs");
const { parse } = require("csv-parse/sync");

function readCSV(filepath) {
  const csvText = fs.readFileSync(filepath, "utf8");

  return parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}

module.exports = { readCSV };