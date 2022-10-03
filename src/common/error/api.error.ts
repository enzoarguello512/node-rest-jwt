import httpStatus from 'http-status';
import BaseError from '../error/base.error';

export class APIError extends BaseError {
  constructor(
    message: string,
    methodName = '',
    httpCode = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super('', message, methodName, httpCode, isOperational);
  }
}
