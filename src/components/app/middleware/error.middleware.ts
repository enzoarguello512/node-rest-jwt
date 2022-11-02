import express from 'express';
import httpStatus from 'http-status';
import ErrorHandler from '../../../common/error.handler.config';
import BaseError from '../../../common/error/base.error';

class ErrorMiddleware {
  // Responsible for returning a consistent response to the user in the event of an error
  public async handle(
    err: BaseError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    if (!ErrorHandler.isTrustedError(err)) {
      next(err);
      return;
    }
    ErrorHandler.handleError(err);
    res
      .status(err.httpCode)
      .json(
        ErrorHandler.formatError(err.httpCode, err.message, undefined, err)
      );
  }

  // Responsible for handling all non-existent routes
  public async routeNotFound(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    const message = `Route '${req.originalUrl}' - Method '${req.method}' not found`;
    res
      .status(httpStatus.NOT_FOUND)
      .json(ErrorHandler.formatError(httpStatus.NOT_FOUND, message, true));
  }
}

export default new ErrorMiddleware();
