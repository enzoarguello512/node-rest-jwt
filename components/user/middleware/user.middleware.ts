import express from 'express';
import userService from '../services/user.service';
import { Error as MongoError } from 'mongoose';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BadRequestError } from '../../../common/error/bad.request.error';

class UsersMiddleware {
  public async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
      return;
    }
    next(
      new BadRequestError(
        'Missing required fields: email and password',
        'validateRequiredUserBodyFields'
      )
    );
  }

  public async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user = await userService.getUserByEmail(req.body.email);
      if (user) {
        next(
          new BadRequestError(
            'User email already exists',
            'validateSameEmailDoesntExist'
          )
        );
        return;
      }
      next();
    } catch (err) {
      if (err instanceof MongoError.CastError) {
        next(
          new BadRequestError('Invalid email', 'validateSameEmailDoesntExist')
        );
        return;
      }
      next(err);
    }
  }

  public async validateSameEmailBelongToSameUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user = await userService.getUserByEmail(req.body.email);
      if (user && user.id === req.params.userId) {
        res.locals.user = user;
        next();
      }
      throw new BadRequestError(
        'Invalid email',
        'validateSameEmailBelongToSameUser'
      );
    } catch (err) {
      if (err instanceof MongoError.CastError) {
        next(
          new BadRequestError(
            'Invalid user id',
            'validateSameEmailBelongToSameUser'
          )
        );
        return;
      }
      next(err);
    }
  }

  public async userCantChangePermission(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (res.locals.user.permissionLevel !== req.body.permissionLevel) {
      next(
        new BadRequestError(
          'User cannot change permission level',
          'userCantChangePermission'
        )
      );
      return;
    }
    next();
  }

  public validatePatchEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.body.email) {
      this.validateSameEmailBelongToSameUser(req, res, next);
    } else {
      next();
    }
  };

  public async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user = await userService.readById(req.params.userId);
      if (!user) {
        throw new NotFoundError('User not found', 'validateUserExists');
      }
      req.body.user = user;
      next();
    } catch (err) {
      if (err instanceof MongoError.CastError) {
        next(new BadRequestError('Invalid user id', 'validateUserExists'));
        return;
      }
      next(err);
    }
  }

  public async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
