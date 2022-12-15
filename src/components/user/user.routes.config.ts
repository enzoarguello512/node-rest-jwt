import CommonRoutesConfig from '../../common/common.routes.config';
import UsersController from './controllers/user.controller';
import UsersMiddleware from './middleware/user.middleware';
import JwtMiddleware from '../../services/auth/middleware/jwt.middleware';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';
import { EPermissionLevel } from '../../common/types/common.permissionlevel.enum';
import BodyValidationMiddleware from '../../common/middleware/body.validation.middleware';
import fileUploadMiddleware from '../app/middleware/file.upload.middleware';
import { body } from 'express-validator';

import express from 'express';

export default class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  public configureRoutes(): express.Application {
    /**
     * GET - Get all users
     * POST - Add a new user
     */
    this.app
      .route(`/users`)
      .get(
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.onlyAdminCanDoThisAction,
        UsersController.listUsers
      )
      .post(
        fileUploadMiddleware,
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    /**
     * GET/:userId - Find an individual user
     * DELETE/:userId - Delete a user
     */
    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(
        UsersMiddleware.validateUserExists,
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction('userId', 'id')
      )
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    /**
     * PATCH/:userId - Update a user
     */
    this.app.patch(`/users/:userId`, [
      UsersMiddleware.validateUserExists,
      JwtMiddleware.validJWTNeeded,
      body('email').isEmail(),
      body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be 8+ characters'),
      body('firstName').isString().optional(),
      body('lastName').isString().optional(),
      body('permissionLevel').isInt().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePatchEmail,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction('userId', 'id'),
      PermissionMiddleware.minimumPermissionLevelRequired(
        EPermissionLevel.PAID_PERMISSION
      ),
      UsersController.patch,
    ]);

    /**
     * PATCH/:userId/permissionLevel/:permissionLevel - Update a user's permission level
     */
    this.app.patch(`/users/:userId/permissionLevel/:permissionLevel`, [
      UsersMiddleware.validateUserExists,
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlyAdminCanDoThisAction,
      UsersController.updatePermissionLevel,
    ]);

    return this.app;
  }
}
