import CommonRoutesConfig from '../../common/common.routes.config';
import ProductsController from './controllers/product.controller';
import ProductsMiddleware from './middleware/product.middleware';
import express from 'express';
import PermissionMiddleware from '../../common/middleware/common.permission.middleware';
import fileUploadMiddleware from '../app/middleware/file.upload.middleware';

export default class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductsRoutes');
  }
  configureRoutes(): express.Application {
    /**
     * GET - Get all products
     * POST - Add a new product
     */
    this.app.route(`/products`).get(ProductsController.listProducts).post(
      fileUploadMiddleware,
      ProductsMiddleware.validateRequiredProductBodyFields,
      // PermissionMiddleware.isAdmin,
      ProductsController.createProduct
    );

    /**
     * GET/:productId - Find an individual product
     * DELETE/:productId - Delete a product
     */
    this.app.param(`productId`, ProductsMiddleware.extractProductId);
    this.app
      .route(`/products/:productId`)
      .all(ProductsMiddleware.validateProductExists)
      .get(ProductsController.getProductById)
      // .all(PermissionMiddleware.isAdmin)
      .delete(ProductsController.removeProduct);

    /**
     * PATCH/:productId - Update a product
     */
    this.app.patch(`/products/:productId`, [ProductsController.patch]);

    return this.app;
  }
}
