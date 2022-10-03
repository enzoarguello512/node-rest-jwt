import express from 'express';
import { BadRequestError } from '../../../common/error/bad.request.error';

class AuthMiddleware {
  public async validateBodyRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      next(
        new BadRequestError(
          'Missing required fields: email and password',
          'validateBodyRequest'
        )
      );
    }
  }
}

export default new AuthMiddleware();
