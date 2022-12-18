import mongoose from 'mongoose';
import debug from 'debug';
import { ICreateMessageDto } from '../dto/create.message.dto';
import { IPatchMessageDto } from '../dto/patch.message.dto';
import BaseError from '../../../common/error/base.error';
import { ICrudMessage } from '../../../common/types/crud.interface';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Message } from '../models/message.model';
import orderService from '../../order/services/order.service';
import cartService from '../../cart/services/cart.service';
import { ICreateOrderDto } from '../../order/dto/create.order.dto';
import { ICreateCartDto } from '../../cart/dto/create.cart.dto';
import { ICreateProductDto } from '../../product/dto/create.product.dto';

const log: debug.IDebugger = debug('app:messages-dao');

class MessagesDao implements ICrudMessage {
  constructor() {
    log('Created new instance of MessagesDao');
  }

  public async create(
    messageFields: ICreateMessageDto
  ): Promise<ICreateMessageDto> {
    try {
      const message = new Message(messageFields);
      await message.save();
      return message;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'create');
      }
      throw new BaseError('Failed to save message', err, 'create');
    }
  }

  public async deleteById(message: ICreateMessageDto) {
    try {
      return Message.deleteOne({ _id: message.id }).exec();
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

  // Method in charge of listing all the messages of a specific user
  public async listUserItemsCollection(userId: string, limit = 200, page = 0) {
    try {
      return Message.find({ user: userId })
        .select('id text type createdAt')
        .limit(limit)
        .skip(limit * page)
        .exec();
    } catch (err) {
      throw new BaseError('Failed to find messages', err, 'listUserMessages');
    }
  }

  public generateSystemMessage = async (
    userId: string,
    messageText: string
  ): Promise<string> => {
    const supportMessages = [
      `Hello! How are you? I am a bot 👩‍💻
     At this time we are with delays in attention, soon we will answer your question. Thanks for your patience 🙌.
    ---
     You can find the answer to your question in this menu or in my repository: https://github.com/enzoarguello512/morfi-react
    ---`,
      `With which of these options can I help you?
     Select the option by writing the corresponding word 👇
     - order: To know the information of your last order.
     - cart: To know the status of your cart`,
      `Hello, I could not understand your message.
    ---`,
    ];

    const lowerCaseMessage = messageText.toLowerCase();

    switch (lowerCaseMessage) {
      case 'welcomemessage': {
        return supportMessages.slice(0, 2).join('\n').toString();
      }

      case 'order': {
        const orders = (await orderService.listUserItemsCollection(
          userId
        )) as ICreateOrderDto[];

        if (orders.length === 0) return 'You have no recent orders';

        const lastOrder = orders[orders.length - 1];

        let message = `⭐ Order ${lastOrder.status} with id: ${lastOrder.id}.\n`;

        message += '---\n';
        message += lastOrder.products
          .map(({ data: product, quantity }) => {
            return `📦 Product: "${
              product.name
            }" - Price: [u. $${product.discountedPrice.toFixed(
              2
            )} x ${quantity}]`;
          })
          .join('\n');
        message += '\n---';

        message += `\n 💳 Total: $${lastOrder.total}`;

        return message;
      }

      case 'cart': {
        const cart = (await cartService.readByUserId(userId)) as ICreateCartDto;

        if (!cart || cart.products.length === 0) return 'Your cart is empty.';

        let totalValue = 0; // Total value of the order in dollars $$$

        let message: string = cart.products
          .map(({ data, quantity }) => {
            const product = data as ICreateProductDto;
            // we use the same map method to avoid having to iterate over the same array again when we are going to calculate the total
            totalValue += product.discountedPrice * quantity;
            return `🛍️ Product: "${
              product.name
            }" - Price: [u. $${product.discountedPrice.toFixed(
              2
            )} x ${quantity}]`;
          })
          .join('\n');
        message += '\n---';

        message += `\n 💳 Total: $${totalValue.toFixed(2)}`;

        return message;
      }

      default: {
        return [supportMessages[2], supportMessages[1]].join('\n').toString();
      }
    }
  };
}

export default new MessagesDao();
