const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const { logger, maskSecret } = require("../utils/logger");

class RegistrationPage extends BasePage {
  static url =
    "https://way2automation.com/way2auto_jquery/registration.php";

  static firstNameInput = By.css(
    "#register_form input[name='name']"
  );

  static lastNameInput = By.css(
    "#register_form .fieldset:first-of-type p:nth-of-type(2) input"
  );

  static hobbyCheckbox = By.css(
    "#register_form input[name='hobby']"
  );

  static phoneInput = By.css(
    "#register_form input[name='phone']"
  );

  static usernameInput = By.css(
    "#register_form input[name='username']"
  );

  static emailInput = By.css(
    "#register_form input[name='email']"
  );

  static passwordInput = By.css(
    "#register_form input[name='password']"
  );

  static confirmPasswordInput = By.css(
    "#register_form input[name='c_password']"
  );

  static submitButton = By.css(
    "#register_form input[type='submit']"
  );

  static formErrors = By.css(
    "#register_form label.error_p"
  );

  constructor(driver) {
    super(driver);
  }

  async openRegistrationPage() {
    await this.open(RegistrationPage.url);
  }

  async enterFirstName(firstName) {
    await this.type(
      RegistrationPage.firstNameInput,
      firstName
    );
  }

  async enterLastName(lastName) {
    await this.type(
      RegistrationPage.lastNameInput,
      lastName
    );
  }

  async selectHobby() {
    await this.click(
      RegistrationPage.hobbyCheckbox
    );
  }

  async enterPhone(phone) {
    await this.type(
      RegistrationPage.phoneInput,
      phone
    );
  }

  async enterUsername(username) {
    await this.type(
      RegistrationPage.usernameInput,
      username
    );
  }

  async enterEmail(email) {
    await this.type(
      RegistrationPage.emailInput,
      email
    );
  }

  async enterPassword(password) {
    logger.info(
      `Entering password: ${maskSecret(password)}`
    );

    await this.type(
      RegistrationPage.passwordInput,
      password
    );
  }

  async enterConfirmPassword(confirmPassword) {
    logger.info(
      `Entering confirmation password: ${maskSecret(confirmPassword)}`
    );

    await this.type(
      RegistrationPage.confirmPasswordInput,
      confirmPassword
    );
  }

  async submitRegistration() {
    await this.click(
      RegistrationPage.submitButton
    );
  }

  async register(data) {
    logger.info(
      `Starting registration for test case: ${data.testId}`
    );

    await this.enterFirstName(data.firstName);
    await this.enterLastName(data.lastName);
    await this.selectHobby();
    await this.enterPhone(data.phone);
    await this.enterUsername(data.username);
    await this.enterEmail(data.email);
    await this.enterPassword(data.password);
    await this.enterConfirmPassword(
      data.confirmPassword
    );

    await this.submitRegistration();

    logger.info(
      `Registration form submitted for test case: ${data.testId}`
    );
  }

  async waitForValidationErrors(
    timeout = this.defaultTimeout
  ) {
    return this.waitForCount(
      RegistrationPage.formErrors,
      1,
      timeout,
      500
    );
  }

  async getValidationErrors() {
    const elements = await this.driver.findElements(
      RegistrationPage.formErrors
    );

    const messages = [];

    for (const element of elements) {
      if (await element.isDisplayed()) {
        const text = (await element.getText()).trim();

        if (text) {
          messages.push(text);
        }
      }
    }

    return messages;
  }
}

module.exports = RegistrationPage;