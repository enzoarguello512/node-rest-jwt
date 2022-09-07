import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { IJwt } from '../../../common/types/jwt.interface';

const accessTokenSecret = config.get<string>('jwt.accesstoken');

class JwtMiddleware {
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
        res.locals.jwt = {
          email: decoded.UserInfo.email,
          permissionLevel: decoded.UserInfo.permissionLevel,
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
