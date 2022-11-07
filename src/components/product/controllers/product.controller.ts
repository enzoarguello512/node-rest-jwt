import express from 'express';
import productsService from '../services/product.service';
import debug from 'debug';
import httpStatus from 'http-status';
import { ICreateProductDto } from '../dto/create.product.dto';
import { UploadedFile } from 'express-fileupload';

const log: debug.IDebugger = debug('app:products-controller');

function transformRequestBody(req: express.Request): ICreateProductDto {
  const { name, description, hasFreeShipping, discount, price, stock } =
    req.body as ICreateProductDto;

  return {
    name,
    description,
    productCode: req.body?.productCode,
    imageId: req.files?.image as UploadedFile, // non-optional (when creating)
    hasFreeShipping,
    discount,
    promotion: req.body?.promotion,
    categories: req.body?.categories,
    region: req.body?.region,
    rating: req.body?.rating,
    payment: req.body?.payment,
    price,
    stock,
  } as ICreateProductDto;
}

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
      const productId: string = req.body.id;
      const product = await productsService.readById(productId);
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
      const newFields: ICreateProductDto = transformRequestBody(req);
      const productId = await productsService.create(newFields);
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
      const productId: string = req.body.id;
      const newFields: ICreateProductDto = transformRequestBody(req);
      log(await productsService.patchById(productId, newFields));
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
      const fetchedProduct: ICreateProductDto = req.body.product;
      log(await productsService.deleteById(fetchedProduct));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductsController();
