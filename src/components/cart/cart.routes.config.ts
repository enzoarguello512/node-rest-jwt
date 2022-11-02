import CommonRoutesConfig from '../../common/common.routes.config';
import CartController from './controllers/cart.controller';
import CartMiddleware from './middleware/cart.middleware';
import ProductMiddleware from '../product/middleware/product.middleware';
import UserMiddleware from '../user/middleware/user.middleware';
import express from 'express';
import JwtMiddleware from '../../services/auth/middleware/jwt.middleware';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';
import { EPermissionLevel } from '../../common/types/common.permissionlevel.enum';

export default class CartRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CartRoutes');
  }
  configureRoutes(): express.Application {
    /**
     * GET - Get all carts
     * POST - Add a new cart
     */
    this.app
      .route(`/cart`)
      .all(JwtMiddleware.validJWTNeeded)
      .get(
        PermissionMiddleware.onlyAdminCanDoThisAction,
        CartController.listCarts
      )
      .post(
        CartMiddleware.validateRequiredCartBodyFields,
        PermissionMiddleware.minimumPermissionLevelRequired(
          EPermissionLevel.FREE_PERMISSION
        ),
        CartController.createCart
      );

    /**
     * DELETE/:cartId - Delete a user
     * PATCH/:cartId - Update a cart
     */
    this.app.param(`cartId`, CartMiddleware.extractCartId);
    this.app
      .route(`/cart/:cartId`)
      .all(
        CartMiddleware.validateCartExists,
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction(
          'cartId',
          'cart'
        )
      )
      .patch(CartController.patch)
      .delete(CartController.removeCart);

    /**
     * GET/:cartId/products - List all products in a cart
     */
    this.app.get(`/cart/:cartId/products`, [
      CartMiddleware.validateCartExists,
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction('cartId', 'cart'),
      CartController.getCartProductsById,
    ]);

    /**
     * DELETE/:cartId/products/:productId - Delete a product from the cart
     */
    this.app.delete(`/cart/:cartId/products/:productId`, [
      CartMiddleware.validateCartExists,
      ProductMiddleware.validateProductExists,
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction('cartId', 'cart'),
      CartController.removeCartProduct,
    ]);

    /**
     * POST/:cartId/products/:productId/:quantity - Add a new product to the cart including its quantity
     */
    this.app.post(`/cart/:cartId/products/:productId/:quantity`, [
      CartMiddleware.validateCartExists,
      ProductMiddleware.validateProductExists,
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction('cartId', 'cart'),
      CartController.addProduct,
    ]);

    /**
     * POST/:userId/:productId/:quantity - Create or read an existing cart and add a new product with its quantity
     */
    this.app.post(`/cart/:userId/:productId/:quantity`, [
      UserMiddleware.validateUserExists,
      ProductMiddleware.validateProductExists,
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction('userId', 'id'),
      CartController.createOrRead,
    ]);

    return this.app;
  }
}
