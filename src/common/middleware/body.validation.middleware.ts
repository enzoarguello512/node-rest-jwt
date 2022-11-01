import express from 'express';
import { validationResult } from 'express-validator';

// Class in charge of express-validator validations, the verifyBodyFieldsErrors method is in charge of handling the middleware
class BodyValidationMiddleware {
  verifyBodyFieldsErrors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  }
}

export default new BodyValidationMiddleware();
