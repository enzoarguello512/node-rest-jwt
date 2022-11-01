import debug from 'debug';
import httpStatus from 'http-status';
import BaseError from './error/base.error';
import { IFormatError, TError } from './types/error.interface';
import { logger } from '../components/app/middleware/logs.middleware';
import config from 'config';

const log: debug.IDebugger = debug('error-handler');
const level = config.get<string>('server.loglevel');

class ErrorHandler {
  public handleError = (err: TError): void => {
    // Shows the error in the console if you are using the "debug" module (npm run development)
    log(err);

    // Basically we check if the error is of class BaseError, otherwise we would be encountering an unknown error (non-operational)
    if ('httpCode' in err) {
      logger.log({
        // We use 500 type errors to store the most important logs ("error" level)
        level: err.httpCode >= 500 ? 'error' : level, // possibly "warn" value
        message: err.message,
      });
    }
  };

  // This is going to be the formatted error that is sent to the user who makes a request to our server
  public formatError(
    httpCode: number,
    message?: string,
    isOperational?: boolean,
    err?: BaseError
  ): IFormatError {
    const structure = {
      message: err?.message || message || 'Generic error',
      error: JSON.stringify(httpStatus[`${httpCode}_MESSAGE`]),
      name: err?.name || 'Error',
      httpCode,
      log: err?.log || 'undefined',
      methodName: err?.methodName || 'undefined',
      isOperational: err?.isOperational || isOperational || false,
    };

    return structure;
  }

  // Check if our error is operational
  public isTrustedError(error: Error): boolean {
    return error instanceof BaseError && error.isOperational;
  }
}

export default new ErrorHandler();
