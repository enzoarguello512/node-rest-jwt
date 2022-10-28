import express from 'express';
import orderService from '../services/order.service';
import httpStatus from 'http-status';
import { Error as MongoError } from 'mongoose';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BadRequestError } from '../../../common/error/bad.request.error';

class OrdersMiddleware {
  public async validateRequiredOrderBodyFields(
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

  public async validateOrderExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const order = await orderService.readById(req.params.orderId);
      if (!order) {
        throw new NotFoundError('Order not found', 'validateOrderExists');
      }
      req.body.order = order;
      next();
    } catch (err) {
      if (err instanceof MongoError.CastError) {
        next(new BadRequestError('Invalid order id', 'validateOrderExists'));
        return;
      }
      next(err);
    }
  }

  public async extractOrderId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.orderId;
    next();
  }
}

export default new OrdersMiddleware();
