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

export type TError = BaseError | Error;
