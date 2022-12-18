import express from 'express';
import messagesService from '../services/message.service';
import debug from 'debug';
import httpStatus from 'http-status';
import { ICreateMessageDto } from '../dto/create.message.dto';

const log: debug.IDebugger = debug('app:messages-controller');

function transformRequestBody(req: express.Request): ICreateMessageDto {
  const { user, text, type } = req.body as ICreateMessageDto;

  return { user, text, type } as ICreateMessageDto;
}

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
      const messageId: string = req.params.userId;
      const messages = await messagesService.listUserItemsCollection(messageId);
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
      const messageId: string = req.body.id;
      const message = await messagesService.readById(messageId);
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
      const newFields: ICreateMessageDto = transformRequestBody(req);
      const message = await messagesService.create(newFields);
      res.status(httpStatus.CREATED).send(message);
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
      const messageId: string = req.body.id;
      const newFields: ICreateMessageDto = transformRequestBody(req);
      log(await messagesService.patchById(messageId, newFields));
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
      const fetchedMessage: ICreateMessageDto = req.body.message;
      log(await messagesService.deleteById(fetchedMessage));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new MessagesController();
