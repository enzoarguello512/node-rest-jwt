import CommonRoutesConfig from '../../common/common.routes.config';
import ProductsController from './controllers/product.controller';
import ProductsMiddleware from './middleware/product.middleware';
import express from 'express';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';

export default class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductsRoutes');
  }
  configureRoutes(): express.Application {
    this.app.route(`/products`).get(ProductsController.listProducts).post(
      ProductsMiddleware.validateRequiredProductBodyFields,
      // PermissionMiddleware.isAdmin,
      ProductsController.createProduct
    );

    this.app.param(`productId`, ProductsMiddleware.extractProductId);
    this.app
      .route(`/products/:productId`)
      .all(ProductsMiddleware.validateProductExists)
      .get(ProductsController.getProductById)
      // .all(PermissionMiddleware.isAdmin)
      .delete(ProductsController.removeProduct);

    this.app.patch(`/products/:productId`, [ProductsController.patch]);

    return this.app;
  }
}
