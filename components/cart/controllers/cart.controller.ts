import express from 'express';
import cartsService from '../services/cart.service';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:carts-controller');

class CartsController {
  public async listCarts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const carts = await cartsService.list(100, 0);
      res.status(httpStatus.OK).send(carts);
    } catch (err) {
      next(err);
    }
  }

  public async getCartProductsById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const cart = await cartsService.readById(req.body.id);
      res.status(httpStatus.OK).send(cart.products);
    } catch (err) {
      next(err);
    }
  }

  public async createCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const cartId = await cartsService.create(req.body);
      res.status(httpStatus.CREATED).send({ id: cartId });
    } catch (err) {
      next(err);
    }
  }

  public async addProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const cartId = await cartsService.addProduct(
        req.body.product,
        req.body.cart
      );
      res.status(httpStatus.CREATED).send({ id: cartId });
    } catch (err) {
      next(err);
    }
  }

  public async removeCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      log(await cartsService.deleteById(req.body.id));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  public async removeCartProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      log(
        await cartsService.deleteProductById(req.body.product, req.body.cart)
      );
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new CartsController();
