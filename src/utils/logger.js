/* eslint-disable no-param-reassign */
const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const requestId = uuidv4();

/**
 * @description - Color the log messages based on message level.
 * @param { string } level - log level.
 * @param { string } message - log message.
 * @returns { string } - colored log message based on log level
 */
const colorMessage = (level, message) => {
  if (level === 'INFO') {
    message = chalk.green(message);
  } else if (level === 'WARN') {
    message = chalk.yellow(message);
  } else if (level === 'ERROR') {
    message = chalk.red(message);
  } else {
    message = chalk.magenta(message);
  }
  return message;
};

// Create logger instance.
const logger = createLogger({
  transports: [new transports.Console({})],

  // format log messages.
  format: format.printf(options => {
    const level = options.level.toUpperCase();
    let message = `${moment().format()} - ${level}: ${requestId} -`;
    if (options.message) {
      message += options.message;
    }
    return colorMessage(level, message);
  })
});

module.exports = { logger };
