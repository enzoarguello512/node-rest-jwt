import CommonRoutesConfig from '../../common/common.routes.config';
import CartController from './controllers/cart.controller';
import CartMiddleware from './middleware/cart.middleware';
import ProductMiddleware from '../product/middleware/product.middleware';
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

    this.app
      .route(`/cart/:cartId/products/:productId`)
      .all(
        CartMiddleware.validateCartExists,
        ProductMiddleware.validateProductExists
      )
      .post([CartController.addProduct])
      .delete([CartController.removeCartProduct]);

    return this.app;
  }
}
