const logger = require("./utils/logger");

exports.mochaHooks = {
  beforeEach() {
    logger.info(`Starting test: ${this.currentTest.title}`);
  },

  afterEach() {
    logger.info(
      `Finished test: ${this.currentTest.title} - ${this.currentTest.state}`
    );
  }
};