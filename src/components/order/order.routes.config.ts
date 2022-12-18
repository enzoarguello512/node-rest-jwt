import CommonRoutesConfig from '../../common/common.routes.config';
import OrdersController from './controllers/order.controller';
import OrdersMiddleware from './middleware/order.middleware';
import UsersMiddleware from '../user/middleware/user.middleware';
import CartMiddleware from '../cart/middleware/cart.middleware';
import express from 'express';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';
import JwtMiddleware from '../../services/auth/middleware/jwt.middleware';
import { EPermissionLevel } from '../../common/types/common.permissionlevel.enum';

export default class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'OrdersRoutes');
  }
  public configureRoutes(): express.Application {
    /**
     * GET - Get all orders
     */
    this.app
      .route(`/orders`)
      .get(
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.onlyAdminCanDoThisAction,
        OrdersController.listOrders
      );

    /**
     * POST/:userId/cart/:cartId - Add a new order based on a user's id and cart (the order will be generated in the backend)
     */
    this.app.post(`/orders/:userId/cart/:cartId`, [
      UsersMiddleware.validateUserExists,
      CartMiddleware.validateCartExists,
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction('userId', 'id'),
      PermissionMiddleware.minimumPermissionLevelRequired(
        EPermissionLevel.FREE_PERMISSION
      ),
      OrdersMiddleware.transformOrder,
      OrdersController.createOrder,
    ]);

    /**
     * GET/:orderId - Find an individual order
     * DELETE/:orderId - Delete a order
     */
    this.app.param(`orderId`, OrdersMiddleware.extractOrderId);
    this.app
      .route(`/orders/:orderId`)
      .all(OrdersMiddleware.validateOrderExists, JwtMiddleware.validJWTNeeded)
      .get(OrdersController.getOrderById)
      .delete(OrdersController.removeOrder);

    /**
     * PATCH/:orderId - Update a order
     */
    this.app.patch(`/orders/:orderId`, [
      OrdersMiddleware.validateOrderExists,
      JwtMiddleware.validJWTNeeded,
      OrdersController.patch,
    ]);

    /**
     * GET/user/:userId - List all user orders
     */
    this.app.get(`/orders/user/:userId`, [
      UsersMiddleware.validateUserExists,
      JwtMiddleware.validJWTNeeded,
      PermissionMiddleware.onlySameUserOrAdminCanDoThisAction('userId', 'id'),
      OrdersController.listUserOrders,
    ]);

    return this.app;
  }
}
