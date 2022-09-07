import express from 'express';
import messageService from '../services/message.service';
import httpStatus from 'http-status';
import { Error as MongoError } from 'mongoose';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BadRequestError } from '../../../common/error/bad.request.error';

class MessagesMiddleware {
  public async validateRequiredMessageBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.user && req.body.text && req.body.type) {
      next();
    } else {
      res.status(httpStatus.BAD_REQUEST).send({
        error: `Missing required fields {user, text, type}`,
      });
    }
  }

  public async validateMessageExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const message = await messageService.readById(req.params.messageId);
      if (!message) {
        throw new NotFoundError('Message not found', 'validateMessageExists');
      }
      req.body.message = message;
      next();
    } catch (err) {
      if (err instanceof MongoError.CastError) {
        next(
          new BadRequestError('Invalid message id', 'validateMessageExists')
        );
        return;
      }
      next(err);
    }
  }

  public async extractMessageId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.messageId;
    next();
  }
}

export default new MessagesMiddleware();
