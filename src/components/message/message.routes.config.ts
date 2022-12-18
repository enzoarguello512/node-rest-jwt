import CommonRoutesConfig from '../../common/common.routes.config';
import MessagesController from './controllers/message.controller';
import MessagesMiddleware from './middleware/message.middleware';
import express from 'express';
import JwtMiddleware from '../../services/auth/middleware/jwt.middleware';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';
import { EPermissionLevel } from '../../common/types/common.permissionlevel.enum';
import UsersMiddleware from '../user/middleware/user.middleware';

export default class MessagesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MessagesRoutes');
  }
  public configureRoutes(): express.Application {
    /**
     * GET - Get all orders
     * POST - Add a new order
     */
    this.app
      .route(`/messages`)
      .all(
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(
          EPermissionLevel.FREE_PERMISSION
        )
      )
      .get(MessagesController.listMessages)
      .post(
        MessagesMiddleware.validateRequiredMessageBodyFields,
        PermissionMiddleware.minimumPermissionLevelRequired(
          EPermissionLevel.FREE_PERMISSION
        ),
        MessagesController.createMessage
      );

    /**
     * GET/:messageId - Find an individual message
     * DELETE/:messageId - Delete a message
     */
    this.app.param(`messageId`, MessagesMiddleware.extractMessageId);
    this.app
      .route(`/messages/:messageId`)
      .all(
        MessagesMiddleware.validateMessageExists,
        JwtMiddleware.validJWTNeeded
      )
      .get(MessagesController.getMessageById)
      .delete(
        PermissionMiddleware.onlyAdminCanDoThisAction,
        MessagesController.removeMessage
      );

    /**
     * PATCH/:messageId - Update a message
     */
    this.app.patch(`/messages/:messageId`, [
      MessagesMiddleware.validateMessageExists,
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlyAdminCanDoThisAction,
      MessagesController.patch,
    ]);

    /**
     * GET/user/:userId - List all user messages
     */
    this.app.get(`/messages/user/:userId`, [
      UsersMiddleware.validateUserExists,
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction('userId', 'id'),
      MessagesController.listUserMessages,
    ]);

    return this.app;
  }
}
