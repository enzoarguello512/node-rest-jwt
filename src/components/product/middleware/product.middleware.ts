import express from 'express';
import productService from '../services/product.service';
import { Error as MongoError } from 'mongoose';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { multiFilter } from '../../../scripts/products.filters';

class ProductsMiddleware {
  public async validateRequiredProductBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.name &&
      req.body.description &&
      req.files?.image &&
      req.body.hasFreeShipping &&
      req.body.discount &&
      req.body.price &&
      req.body.stock
    ) {
      next();
    } else {
      next(
        new BadRequestError(
          `Missing required fields: name, description, image, hasFreeShipping, discount, price, stock`,
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

  public async validateProductQuery(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const filters = {
        page: parseInt(req.query.page as string) - 1 || 0, // number
        limit: parseInt(req.query.limit as string) || 5, // number
        search: req.query.search || '', // string
        sort: [] as Array<string>, // Array<string>
        sortBy: {} as { [key: string]: string }, // Object
        categories: req.query.categories || ['All'], // Array<string>
        region: req.query.region || ['All'], // Array<string>
        payment: req.query.payment || ['All'], // Array<string>
        promotion: req.query.promotion || ['All'], // Array<string>
      };

      if (typeof req.query.sort === 'string') {
        filters.sort = req.query.sort.split(',');
      } else {
        filters.sort = ['rating'];
      }

      const { sort, sortBy } = filters;
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = 'asc';
      }

      const multiTagFilters = [
        'categories',
        'region',
        'payment',
        'promotion',
      ] as const;

      for (let i = 0; i < multiTagFilters.length; i++) {
        const filterName = multiTagFilters[i];
        let filterProp = filters[filterName];
        if (filterProp === 'All') {
          filterProp = [...multiFilter[filterName]];
        } else if (typeof filterProp === 'string') {
          filterProp = filterProp.split(',');
        }
      }

      req.body.filters = filters;
      next();
    } catch (err) {
      next(err);
    }
  }

  // Utility for downstream middleware/controllers
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
