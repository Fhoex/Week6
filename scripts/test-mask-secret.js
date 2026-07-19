const { maskSecret } = require("../utils/logger");

const samplePassword = "Password123";

console.log("Original password:", samplePassword);
console.log("Masked password:", maskSecret(samplePassword));