import express from 'express';
import ordersService from '../services/order.service';
import debug from 'debug';
import httpStatus from 'http-status';
import { ICreateOrderDto } from '../dto/create.order.dto';

const log: debug.IDebugger = debug('app:orders-controller');

function transformRequestBody(req: express.Request): ICreateOrderDto {
  const {
    user,
    products,
    total,
    status,
    deliveryAddress,
    contact: { email, phoneNumber },
  } = req.body as ICreateOrderDto;

  return {
    user,
    products,
    total,
    status,
    deliveryAddress,
    contact: {
      email,
      phoneNumber,
    },
  } as ICreateOrderDto;
}

class OrdersController {
  public async listOrders(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const orders = await ordersService.list(100, 0);
      res.status(httpStatus.OK).send(orders);
    } catch (err) {
      next(err);
    }
  }

  public async listUserOrders(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const orderId: string = req.params.userId;
      const orders = await ordersService.listUserItemsCollection(orderId);
      res.status(httpStatus.OK).send(orders);
    } catch (err) {
      next(err);
    }
  }

  public async getOrderById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const orderId: string = req.body.id;
      const order = await ordersService.readById(orderId);
      res.status(httpStatus.OK).send(order);
    } catch (err) {
      next(err);
    }
  }

  public async createOrder(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const newFields: ICreateOrderDto = transformRequestBody(req);
      const orderId = await ordersService.create(newFields);
      res.status(httpStatus.CREATED).send({ id: orderId });
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
      const orderId: string = req.body.id;
      const newFields: ICreateOrderDto = transformRequestBody(req);
      log(await ordersService.patchById(orderId, newFields));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  public async removeOrder(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const fetchedOrder: ICreateOrderDto = req.body.order;
      log(await ordersService.deleteById(fetchedOrder));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new OrdersController();
