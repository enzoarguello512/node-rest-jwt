import CommonRoutesConfig from '../../common/common.routes.config';
import OrdersController from './controllers/order.controller';
import OrdersMiddleware from './middleware/order.middleware';
import express from 'express';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';

export default class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'OrdersRoutes');
  }
  configureRoutes(): express.Application {
    this.app.route(`/orders`).get(OrdersController.listOrders).post(
      OrdersMiddleware.validateRequiredOrderBodyFields,
      // PermissionMiddleware.isAdmin,
      OrdersController.createOrder
    );

    this.app.param(`orderId`, OrdersMiddleware.extractOrderId);
    this.app
      .route(`/orders/:orderId`)
      .all(OrdersMiddleware.validateOrderExists)
      .get(OrdersController.getOrderById)
      // .all(PermissionMiddleware.isAdmin)
      .delete(OrdersController.removeOrder);

    this.app.patch(`/orders/:orderId`, [OrdersController.patch]);

    this.app.get(`/orders/user/:userId`, [OrdersController.listUserOrders]);

    return this.app;
  }
}
