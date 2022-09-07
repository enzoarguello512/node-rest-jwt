import express from 'express';
import productsService from '../services/product.service';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:products-controller');

class ProductsController {
  public async listProducts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const products = await productsService.list(100, 0);
      res.status(httpStatus.OK).send(products);
    } catch (err) {
      next(err);
    }
  }

  public async getProductById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const product = await productsService.readById(req.params.productId);
      res.status(httpStatus.OK).send(product);
    } catch (err) {
      next(err);
    }
  }

  public async createProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const productId = await productsService.create(req.body);
      res.status(httpStatus.CREATED).send({ id: productId });
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
      log(await productsService.patchById(req.params.productId, req.body));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  public async removeProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      log(await productsService.deleteById(req.params.productId));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductsController();
