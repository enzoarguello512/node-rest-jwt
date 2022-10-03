import mongoose from 'mongoose';
import debug from 'debug';
import { ICreateMessageDto } from '../dto/create.message.dto';
import { IPatchMessageDto } from '../dto/patch.message.dto';
import BaseError from '../../../common/error/base.error';
import { ICrudMessage } from '../../../common/types/crud.interface';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Message } from '../models/message.model';

const log: debug.IDebugger = debug('app:messages-dao');

class MessagesDao implements ICrudMessage {
  constructor() {
    log('Created new instance of MessagesDao');
  }

  public async create(messageFields: ICreateMessageDto): Promise<string> {
    try {
      const message = new Message(messageFields);
      await message.save();
      return message.id;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'create');
      }
      throw new BaseError('Failed to save message', err, 'create');
    }
  }

  public async deleteById(messageId: string) {
    try {
      return Message.deleteOne({ _id: messageId }).exec();
    } catch (err) {
      throw new BaseError('Failed to remove message', err, 'deleteById');
    }
  }

  public async readById(messageId: string) {
    try {
      return Message.findOne({ _id: messageId }).exec();
    } catch (err) {
      throw new BaseError('Failed to find message', err, 'readById');
    }
  }

  public async list(limit = 200, page = 0) {
    return Message.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  public async patchById(messageId: string, messageFields: IPatchMessageDto) {
    try {
      const existingMessage = await Message.findOneAndUpdate(
        { _id: messageId },
        { $set: messageFields },
        { new: true }
      ).exec();

      return existingMessage;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'patchById');
      }
      throw new BaseError('Failed to update message', err, 'patchById');
    }
  }

  public async listUserMessages(userId: string, limit = 200, page = 0) {
    try {
      return Message.find({ user: userId })
        .limit(limit)
        .skip(limit * page)
        .populate('user')
        .exec();
    } catch (err) {
      throw new BaseError('Failed to find messages', err, 'listUserMessages');
    }
  }
}

export default new MessagesDao();
