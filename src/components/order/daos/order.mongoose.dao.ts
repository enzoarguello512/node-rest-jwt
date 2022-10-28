import mongoose from 'mongoose';
import debug from 'debug';
import { ICreateOrderDto } from '../dto/create.order.dto';
import { IPatchOrderDto } from '../dto/patch.order.dto';
import BaseError from '../../../common/error/base.error';
import { ICrudDerivedToUser } from '../../../common/types/crud.interface';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Order } from '../models/order.model';

const log: debug.IDebugger = debug('app:orders-dao');

class OrdersDao implements ICrudDerivedToUser {
  constructor() {
    log('Created new instance of OrdersDao');
  }

  public async create(orderFields: ICreateOrderDto): Promise<string> {
    try {
      const order = new Order(orderFields);
      await order.save();
      return order.id;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const order = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(order.join('. '), 'create');
      }
      throw new BaseError('Failed to save order', err, 'create');
    }
  }

  public async deleteById(order: ICreateOrderDto) {
    try {
      return Order.deleteOne({ _id: order.id }).exec();
    } catch (err) {
      throw new BaseError('Failed to remove order', err, 'deleteById');
    }
  }

  public async readById(orderId: string) {
    try {
      return Order.findOne({ _id: orderId }).exec();
    } catch (err) {
      throw new BaseError('Failed to find order', err, 'readById');
    }
  }

  public async list(limit = 200, page = 0) {
    return Order.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  public async patchById(orderId: string, orderFields: IPatchOrderDto) {
    try {
      const existingOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        { $set: orderFields },
        { new: true }
      ).exec();

      return existingOrder;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const order = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(order.join('. '), 'patchById');
      }
      throw new BaseError('Failed to update order', err, 'patchById');
    }
  }

  public async listUserItemsCollection(userId: string, limit = 200, page = 0) {
    try {
      return Order.find({ user: userId })
        .limit(limit)
        .skip(limit * page)
        .populate('user')
        .exec();
    } catch (err) {
      throw new BaseError('Failed to find orders', err, 'listUserOrders');
    }
  }
}

export default new OrdersDao();
