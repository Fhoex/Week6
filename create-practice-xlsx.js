const XLSX = require("xlsx");

const rows = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Carol", age: 45 },
  { id: 4, name: "Dan", age: 19 },
  { id: 5, name: "Eve", age: 99 },
];

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(rows);

XLSX.utils.book_append_sheet(workbook, worksheet, "Practice");
XLSX.writeFile(workbook, "data/practice.xlsx");

console.log("data/practice.xlsx created successfully");