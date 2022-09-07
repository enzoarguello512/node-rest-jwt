import express from 'express';
import cartService from '../services/cart.service';
import httpStatus from 'http-status';
import { Error as MongoError } from 'mongoose';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { ICreateCartDto } from '../dto/create.cart.dto';

class CartsMiddleware {
  public async validateRequiredCartBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.products) {
      next();
    } else {
      res.status(httpStatus.BAD_REQUEST).send({
        error: `Missing required fields {products}`,
      });
    }
  }

  public async validateCartExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const cart: ICreateCartDto = await cartService.readById(
        req.params.cartId
      );
      if (!cart) {
        throw new NotFoundError('Cart not found', 'validateCartExists');
      }
      req.body.cart = cart;
      next();
    } catch (err) {
      if (err instanceof MongoError.CastError) {
        next(new BadRequestError('Invalid cart id', 'validateCartExists'));
        return;
      }
      next(err);
    }
  }

  public async extractCartId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.cartId;
    next();
  }
}

export default new CartsMiddleware();
