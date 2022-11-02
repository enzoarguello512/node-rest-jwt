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
    /**
     * GET - Get all orders
     * POST - Add a new order
     */
    this.app.route(`/messages`).get(MessagesController.listMessages).post(
      MessagesMiddleware.validateRequiredMessageBodyFields,
      // PermissionMiddleware.isAdmin,
      MessagesController.createMessage
    );

    /**
     * GET/:messageId - Find an individual message
     * DELETE/:messageId - Delete a message
     */
    this.app.param(`messageId`, MessagesMiddleware.extractMessageId);
    this.app
      .route(`/messages/:messageId`)
      .all(MessagesMiddleware.validateMessageExists)
      .get(MessagesController.getMessageById)
      // .all(PermissionMiddleware.isAdmin)
      .delete(MessagesController.removeMessage);

    /**
     * PATCH/:messageId - Update a message
     */
    this.app.patch(`/messages/:messageId`, [MessagesController.patch]);

    /**
     * GET/user/:userId - List all user messages
     */
    this.app.get(`/messages/user/:userId`, [
      MessagesController.listUserMessages,
    ]);

    return this.app;
  }
}
