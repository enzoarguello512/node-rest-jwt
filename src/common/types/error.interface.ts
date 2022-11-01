import BaseError from '../error/base.error';

export interface IFormatError {
  message: string;
  error: string;
  name: string;
  httpCode: number;
  log: string;
  methodName: string;
  isOperational: boolean;
}

// It is the type of error by default, BaseError if it is operational
export type TError = BaseError | Error;
