import express from 'express';
import debug from 'debug';
import { EPermissionLevel } from '../types/common.permissionlevel.enum';
import { IJwt } from '../types/jwt.interface';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {
  minimumPermissionLevelRequired(requiredPermissionLevel: EPermissionLevel) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const userPermissionLevel: number = res.locals.jwt.permissionLevel;

        if (userPermissionLevel & requiredPermissionLevel) {
          next();
        } else {
          res.status(403).send();
        }
      } catch (e) {
        log(e);
      }
    };
  }

  onlySameUserOrAdminCanDoThisAction(paramsProp: string, jwtProp: string) {
    return async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // User authentication data
      // The authentication is based on the IJwt interface
      const jwtAuthObj = res.locals.jwt as IJwt;

      const userPermissionLevel: number = jwtAuthObj.permissionLevel;

      // Parameter that comes from the user request
      // e.g cartId, userId, messageId, productId, etc.
      const param: string = req.params[paramsProp];

      // @ts-ignore
      let jwtAuthProp: string = jwtAuthObj[jwtProp];

      // We add an exception to the cart property because the authentication works differently than the mongoose model, the authentication is based on the IJwt interface
      // The operation can be found in "./auth.controller.ts"
      if (jwtProp === 'cart' && jwtAuthObj.cart.id) {
        jwtAuthProp = jwtAuthObj.cart.id;
      }

      if (param && param === jwtAuthProp) {
        return next();
      } else {
        if (userPermissionLevel & EPermissionLevel.ADMIN_PERMISSION) {
          return next();
        } else {
          return res.status(403).send();
        }
      }
    };
  }

  async onlyAdminCanDoThisAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userPermissionLevel: number = res.locals.jwt.permissionLevel;

    if (userPermissionLevel & EPermissionLevel.ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
}

export default new CommonPermissionMiddleware();
