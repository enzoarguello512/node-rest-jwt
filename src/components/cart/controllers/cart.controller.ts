import express from 'express';
import cartsService from '../services/cart.service';
import debug from 'debug';
import httpStatus from 'http-status';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { ICreateUserDto } from '../../user/dto/create.user.dto';
import { ICreateProductDto } from '../../product/dto/create.product.dto';

const log: debug.IDebugger = debug('app:carts-controller');

function transformRequestBody(req: express.Request): ICreateCartDto {
  const { products } = req.body as ICreateCartDto;

  return {
    products, // depending on the method it starts as an empty array
    user: req.body?.user, // optional in case you want to create a cart but without a user
  } as ICreateCartDto;
}

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
      const cartId: string = req.body.id;
      const cart = await cartsService.readById(cartId);
      res.status(httpStatus.OK).send(cart);
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
      const newFields: ICreateCartDto = transformRequestBody(req);
      const cart = await cartsService.create(newFields);
      res.status(httpStatus.CREATED).send(cart);
    } catch (err) {
      next(err);
    }
  }

  public async createOrRead(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const fetchedUser: ICreateUserDto = req.body.user;
      const fetchedProduct: ICreateProductDto = req.body.product;
      const quantity: number = parseInt(req.params.quantity);
      const cart: ICreateCartDto = await cartsService.createOrRead(
        fetchedUser,
        fetchedProduct,
        quantity
      );
      res.status(httpStatus.CREATED).send(cart);
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
      const cartId: string = req.body.id;
      const newFields: ICreateCartDto = transformRequestBody(req);
      log(await cartsService.patchById(cartId, newFields));
      res.status(httpStatus.NO_CONTENT).send();
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
      const fetchedProduct: ICreateProductDto = req.body.product;
      const fetchedCart: ICreateCartDto = req.body.cart;
      const quantity: number = parseInt(req.params.quantity);
      const newCart: ICreateCartDto = await cartsService.addProduct(
        fetchedProduct,
        fetchedCart,
        quantity
      );
      res.status(httpStatus.CREATED).send(newCart);
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
      const fetchedCart: ICreateCartDto = req.body.cart;
      log(await cartsService.deleteById(fetchedCart));
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
      const fetchedProduct: ICreateProductDto = req.body.product;
      const fetchedCart: ICreateCartDto = req.body.cart;
      log(await cartsService.deleteProductById(fetchedProduct, fetchedCart));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new CartsController();
