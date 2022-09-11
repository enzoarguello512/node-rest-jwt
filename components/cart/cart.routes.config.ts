import CommonRoutesConfig from '../../common/common.routes.config';
import CartController from './controllers/cart.controller';
import CartMiddleware from './middleware/cart.middleware';
import ProductMiddleware from '../product/middleware/product.middleware';
import UserMiddleware from '../user/middleware/user.middleware';
import express from 'express';

export default class CartRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CartRoutes');
  }
  configureRoutes(): express.Application {
    this.app
      .route(`/cart`)
      .get(CartController.listCarts)
      .post(
        CartMiddleware.validateRequiredCartBodyFields,
        CartController.createCart
      );

    this.app.param(`cartId`, CartMiddleware.extractCartId);
    this.app.delete(`/cart/:cartId`, [
      CartMiddleware.validateCartExists,
      CartController.removeCart,
    ]);

    this.app.get(`/cart/:cartId/products`, [
      CartMiddleware.validateCartExists,
      CartController.getCartProductsById,
    ]);

    this.app.delete(`/cart/:cartId/products/:productId`, [
      CartMiddleware.validateCartExists,
      ProductMiddleware.validateProductExists,
      CartController.removeCartProduct,
    ]);

    this.app.post(`/cart/:cartId/products/:productId/:quantity`, [
      CartMiddleware.validateCartExists,
      ProductMiddleware.validateProductExists,
      CartController.addProduct,
    ]);

    this.app.post(`/cart/:userId/:productId/:quantity`, [
      UserMiddleware.validateUserExists,
      ProductMiddleware.validateProductExists,
      CartController.createOrRead,
    ]);

    return this.app;
  }
}
