import express from 'express';
import debug from 'debug';
import { EPermissionLevel } from '../types/common.permissionlevel.enum';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {
  minimumPermissionLevelRequired(requiredPermissionLevel: EPermissionLevel) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const userPermissionLevel = parseInt(res.locals.jwt.permissionLevel);
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
      const userPermissionLevel = parseInt(res.locals.jwt.permissionLevel);
      const param = req.params[paramsProp];
      const localJwt = res.locals.jwt[jwtProp];
      if (req.params && param && param === localJwt) {
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
    const userPermissionLevel = parseInt(res.locals.jwt.permissionLevel);
    if (userPermissionLevel & EPermissionLevel.ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
}

export default new CommonPermissionMiddleware();
