import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { IJwt } from '../../../common/types/jwt.interface';

const accessTokenSecret = config.get<string>('jwt.accesstoken');

class JwtMiddleware {
  // Method responsible for validating all valid jwt (verified with the secret signature)
  public validJWTNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send();
        }
        const decoded = jwt.verify(authorization[1], accessTokenSecret) as IJwt;
        // We add our jwt to the response so that it can be used elsewhere in the application (for example in CommonPermissionMiddleware)
        res.locals.jwt = {
          id: decoded?.id || req.params.cartId || '',
          email: decoded?.email || '',
          firstName: decoded?.firstName || '',
          permissionLevel: decoded?.permissionLevel || '',
          cart: decoded?.cart || req.params.cartId || '',
        };
        next();
      } catch (err) {
        return res.status(403).send(); //invalid token
      }
    } else {
      return res.status(401).send();
    }
  }
}

export default new JwtMiddleware();
