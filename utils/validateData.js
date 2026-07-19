function validateData(rows) {
  const ids = new Set();

  for (const [index, row] of rows.entries()) {
    const rowNumber = index + 2;

    if (!row.testId) {
      throw new Error(`Row ${rowNumber}: testId is required.`);
    }

    if (ids.has(row.testId)) {
      throw new Error(`Duplicate testId: ${row.testId}`);
    }

    ids.add(row.testId);

    if (!["pass", "fail"].includes(row.expected)) {
      throw new Error(
        `Row ${rowNumber}: expected must be 'pass' or 'fail'.`
      );
    }

    if (row.expected === "fail" && !row.expectedError) {
      throw new Error(
        `Row ${rowNumber}: expectedError is required for failed tests.`
      );
    }
  }

  return true;
}

module.exports = { validateData };