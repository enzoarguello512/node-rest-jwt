import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';

// Logger config
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(__dirname, '..', '..', '..', 'logs/warn.log'),
      level: 'warn',
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '..', '..', '..', 'logs/error.log'),
      level: 'error',
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

export const logger = winston.createLogger({
  ...(loggerOptions as winston.LoggerOptions),
});

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, make terse
  if (typeof global.it === 'function') {
    loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
  }
}
export default expressWinston.logger(loggerOptions);
