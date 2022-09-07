import express from 'express';
import messagesService from '../services/message.service';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:messages-controller');

class MessagesController {
  public async listMessages(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const messages = await messagesService.list(100, 0);
      res.status(httpStatus.OK).send(messages);
    } catch (err) {
      next(err);
    }
  }

  public async listUserMessages(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const messages = await messagesService.listUserMessages(
        req.params.userId
      );
      res.status(httpStatus.OK).send(messages);
    } catch (err) {
      next(err);
    }
  }

  public async getMessageById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const message = await messagesService.readById(req.params.messageId);
      res.status(httpStatus.OK).send(message);
    } catch (err) {
      next(err);
    }
  }

  public async createMessage(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const messageId = await messagesService.create(req.body);
      res.status(httpStatus.CREATED).send({ id: messageId });
    } catch (err) {
      next(err);
    }
  }

  public async patch(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      log(await messagesService.patchById(req.params.messageId, req.body));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  public async removeMessage(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      log(await messagesService.deleteById(req.params.messageId));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new MessagesController();
