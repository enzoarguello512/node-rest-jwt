import express from 'express';
import orderService from '../services/order.service';
import httpStatus from 'http-status';
import { Error as MongoError } from 'mongoose';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { ICreateCartDto } from '../../cart/dto/create.cart.dto';
import { ICreateUserDto } from '../../user/dto/create.user.dto';
import { ICreateProductDto } from '../../product/dto/create.product.dto';

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

  public async transformOrder(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user = req.body.user as ICreateUserDto;
      const cart = req.body.cart as ICreateCartDto;
      let total = 0;

      const order = {
        user: user.id,
        products: cart.products.map((productData) => {
          const product = productData.data as ICreateProductDto;
          // we use the same map method to avoid having to iterate over the same array again when we are going to calculate the total
          total += product.discountedPrice * productData.quantity;
          return {
            data: {
              id: product.id,
              name: product.name,
              description: product.description,
              imageUrl: product.imageUrl,
              hasFreeShipping: product.hasFreeShipping,
              discountedPrice: product.discountedPrice,
            },
            quantity: productData.quantity,
          };
        }),
        total,
        status: 'Completed',
        deliveryAddress: user.address,
        contact: {
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      };

      // we combine the data that the body already has with the new order that we create
      req.body = {
        ...req.body,
        ...order,
      };
      next();
    } catch (err) {
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
