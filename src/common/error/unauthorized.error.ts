import httpStatus from 'http-status';
import BaseError from '../error/base.error';

export class UnauthorizedError extends BaseError {
  constructor(message = 'UNAUTHORIZED', methodName = '') {
    super('', message, methodName, httpStatus.UNAUTHORIZED, true);
  }
}
