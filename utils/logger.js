const {
  createLogger,
  format,
  transports
} = require("winston");

function maskSecret(str) {
  if (!str) {
    return str;
  }

  if (str.length <= 4) {
    return "***";
  }

  return str.slice(0, 2) + "***" + str.slice(-2);
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/test.log"
    })
  ]
});

module.exports = {
  logger,
  maskSecret
};