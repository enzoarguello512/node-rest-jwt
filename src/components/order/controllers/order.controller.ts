import express from 'express';
import ordersService from '../services/order.service';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:orders-controller');

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
      const orders = await ordersService.listUserItemsCollection(
        req.params.userId
      );
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
      const order = await ordersService.readById(req.params.orderId);
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
      const orderId = await ordersService.create(req.body);
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
      log(await ordersService.patchById(req.params.orderId, req.body));
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
      log(await ordersService.deleteById(req.body.order));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new OrdersController();
