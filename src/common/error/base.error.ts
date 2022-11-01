import httpStatus from 'http-status';

// This is an extension of the "Error" class that is responsible for providing consistency to all errors that are operational
export default class BaseError extends Error {
  public readonly log: string;
  public readonly methodName: string | undefined;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(
    log: string,
    message: string | unknown = log,
    methodName?: string,
    httpCode = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(<string>message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.log = log;
    if (methodName) this.methodName = methodName;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
