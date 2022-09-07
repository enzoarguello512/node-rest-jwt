import express from 'express';
import productService from '../services/product.service';
import { Error as MongoError } from 'mongoose';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BadRequestError } from '../../../common/error/bad.request.error';

class ProductsMiddleware {
  public async validateRequiredProductBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.name && req.body.price && req.body.stock) {
      next();
    } else {
      next(
        new BadRequestError(
          `Missing required fields: name, price and stock`,
          'validateRequiredProductBodyFields'
        )
      );
    }
  }

  public async validateProductExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const product = await productService.readById(req.params.productId);
      if (!product) {
        throw new NotFoundError('Product not found', 'validateProductExists');
      }
      req.body.product = product;
      next();
    } catch (err) {
      if (err instanceof MongoError.CastError) {
        next(
          new BadRequestError('Invalid product id', 'validateProductExists')
        );
        return;
      }
      next(err);
    }
  }

  public async extractProductId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.productId;
    next();
  }
}

export default new ProductsMiddleware();
