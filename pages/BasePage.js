const { until } = require("selenium-webdriver");

class BasePage {
  constructor(driver, defaultTimeout = 10000) {
    this.driver = driver;
    this.defaultTimeout = defaultTimeout;
  }

  async open(url) {
    await this.driver.get(url);
  }

  async waitForVisible(locator, timeout = this.defaultTimeout) {
    const element = await this.driver.wait(
      until.elementLocated(locator),
      timeout
    );

    await this.driver.wait(
      until.elementIsVisible(element),
      timeout
    );

    return element;
  }

  async waitForCount(
    locator,
    expectedCount,
    timeout = this.defaultTimeout,
    pollingInterval = 500
  ) {
    await this.driver.wait(
      async () => {
        const elements = await this.driver.findElements(locator);
        return elements.length === expectedCount;
      },
      timeout,
      `Expected ${expectedCount} elements, but the count did not match within ${timeout} ms`,
      pollingInterval
    );

    return this.driver.findElements(locator);
  }

  async click(locator) {
    const element = await this.waitForVisible(locator);
    await element.click();
  }

  async type(locator, text) {
    const element = await this.waitForVisible(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(locator) {
    const element = await this.waitForVisible(locator);
    return element.getText();
  }
}

module.exports = BasePage;