import CommonRoutesConfig from '../../common/common.routes.config';
import OrdersController from './controllers/order.controller';
import OrdersMiddleware from './middleware/order.middleware';
import UsersMiddleware from '../user/middleware/user.middleware';
import CartMiddleware from '../cart/middleware/cart.middleware';
import express from 'express';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';

export default class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'OrdersRoutes');
  }
  configureRoutes(): express.Application {
    /**
     * GET - Get all orders
     */
    this.app.route(`/orders`).get(OrdersController.listOrders);

    /**
     * POST/:userId/cart/:cartId - Add a new order based on a user's id and cart (the order will be generated in the backend)
     */
    this.app.post(`/orders/:userId/cart/:cartId`, [
      // PermissionMiddleware.isAdmin,
      UsersMiddleware.validateUserExists,
      CartMiddleware.validateCartExists,
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
      .all(OrdersMiddleware.validateOrderExists)
      .get(OrdersController.getOrderById)
      // .all(PermissionMiddleware.isAdmin)
      .delete(OrdersController.removeOrder);

    /**
     * PATCH/:orderId - Update a order
     */
    this.app.patch(`/orders/:orderId`, [OrdersController.patch]);

    /**
     * GET/user/:userId - List all user orders
     */
    this.app.get(`/orders/user/:userId`, [OrdersController.listUserOrders]);

    return this.app;
  }
}
