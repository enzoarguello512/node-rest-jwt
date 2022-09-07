import CommonRoutesConfig from '../../common/common.routes.config';
import UsersController from './controllers/user.controller';
import UsersMiddleware from './middleware/user.middleware';
import JwtMiddleware from '../../services/auth/middleware/jwt.middleware';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';
import { EPermissionLevel } from '../../common/types/common.permissionlevel.enum';
import BodyValidationMiddleware from '../../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

import express from 'express';

export default class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.onlyAdminCanDoThisAction,
        UsersController.listUsers
      )
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(
        UsersMiddleware.validateUserExists,
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    // this.app.patch(`/users/:userId`, [
    //   JwtMiddleware.validJWTNeeded,
    //   body('email').isEmail(),
    //   body('password')
    //     .isLength({ min: 5 })
    //     .withMessage('Must include password (5+ characters)'),
    //   body('firstName').isString(),
    //   body('lastName').isString(),
    //   body('permissionLevel').isInt(),
    //   BodyValidationMiddleware.verifyBodyFieldsErrors,
    //   UsersMiddleware.validateSameEmailBelongToSameUser,
    //   UsersMiddleware.userCantChangePermission,
    //   PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //   PermissionMiddleware.minimumPermissionLevelRequired(
    //     EPermissionLevel.PAID_PERMISSION
    //   ),
    //   UsersController.patch,
    // ]);

    this.app.patch(`/users/:userId`, [
      JwtMiddleware.validJWTNeeded,
      body('email').isEmail().optional(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be 5+ characters')
        .optional(),
      body('firstName').isString().optional(),
      body('lastName').isString().optional(),
      body('permissionLevel').isInt().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePatchEmail,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      PermissionMiddleware.minimumPermissionLevelRequired(
        EPermissionLevel.PAID_PERMISSION
      ),
      UsersController.patch,
    ]);

    this.app.patch(`/users/:userId/permissionLevel/:permissionLevel`, [
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      PermissionMiddleware.minimumPermissionLevelRequired(
        EPermissionLevel.ADMIN_PERMISSION
      ),
      UsersController.updatePermissionLevel,
    ]);

    return this.app;
  }
}
