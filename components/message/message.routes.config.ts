import CommonRoutesConfig from '../../common/common.routes.config';
import MessagesController from './controllers/message.controller';
import MessagesMiddleware from './middleware/message.middleware';
import express from 'express';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';

export default class MessagesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MessagesRoutes');
  }
  configureRoutes(): express.Application {
    this.app.route(`/messages`).get(MessagesController.listMessages).post(
      MessagesMiddleware.validateRequiredMessageBodyFields,
      // PermissionMiddleware.isAdmin,
      MessagesController.createMessage
    );

    this.app.param(`messageId`, MessagesMiddleware.extractMessageId);
    this.app
      .route(`/messages/:messageId`)
      .all(MessagesMiddleware.validateMessageExists)
      .get(MessagesController.getMessageById)
      // .all(PermissionMiddleware.isAdmin)
      .delete(MessagesController.removeMessage);

    this.app.patch(`/messages/:messageId`, [MessagesController.patch]);

    this.app.get(`/messages/user/:userId`, [
      MessagesController.listUserMessages,
    ]);

    return this.app;
  }
}
