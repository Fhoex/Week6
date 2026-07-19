const { Builder } = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

const RegistrationPage = require("../pages/RegistrationPage");
const { readData } = require("../utils/data");
const { validateData } = require("../utils/validateData");

const source = process.env.DATA_SOURCE || "xlsx";
const headless = process.env.HEADLESS === "true";

const filepath =
  source === "csv"
    ? "data/registration-data.csv"
    : "data/registration-data.xlsx";

const dataset = readData(filepath);

validateData(dataset);

const filter = process.env.TEST_FILTER || "";

const filteredData = dataset.filter((row) =>
  row.testId.startsWith(filter)
);

const smokeTestIds = new Set([
  "REG_VAL_001",
  "REG_EMAIL_001",
  "REG_MISMATCH_001",
  "REG_LENGTH_001",
  "REG_REQUIRED_001"
]);

describe("Registration Data-Driven Tests", function () {
  this.timeout(60000);

  let driver;
  let registrationPage;

  before(async function () {
    this.timeout(60000);

    const options = new chrome.Options();

    if (headless) {
      options.addArguments(
        "--headless=new",
        "--window-size=1920,1080",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage"
      );
    }

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    registrationPage = new RegistrationPage(driver);
  });

  beforeEach(async function () {
    this.timeout(60000);

    await registrationPage.openRegistrationPage();
  });

  after(async function () {
    this.timeout(60000);

    if (driver) {
      await driver.quit();
    }
  });

  filteredData.forEach((row) => {
    const tag = smokeTestIds.has(row.testId)
      ? "@smoke"
      : "@regression";

    const testTitle =
      `${tag} ${row.testId} - ${row.testCase}`;

    it(testTitle, async function () {
      await registrationPage.register(row);

      if (row.expected !== "pass") {
        await registrationPage.waitForValidationErrors();
      }

      const errors =
        await registrationPage.getValidationErrors();

      const errorText =
        errors.join(" ").toLowerCase();

      if (row.expected === "pass") {
        assert.strictEqual(
          errors.length,
          0,
          `Expected registration to pass, but found: ${errorText}`
        );
      } else {
        assert.ok(
          errors.length > 0,
          `Expected registration to fail for: ${row.expectedError}`
        );
      }
    });
  });
});