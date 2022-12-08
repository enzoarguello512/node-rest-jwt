import express from 'express';
import productService from '../services/product.service';
import { Error as MongoError, SortOrder } from 'mongoose';
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
      const {
        page,
        limit,
        search,
        sort,
        //sortBy,
        categories,
        region,
        payment,
        promotion,
      } = req.query;

      const filters = {
        page: typeof page === 'string' ? parseInt(page) - 1 : 0, // number
        limit: typeof limit === 'string' ? parseInt(limit) : 5, // number
        search: typeof search === 'string' ? search : '', // string
        sort: typeof sort === 'string' ? sort.split(',') : ['rating'], // Array<string>
        sortBy: {} as { [key: string]: SortOrder }, // Object
        categories:
          typeof categories === 'string' ? categories.split(',') : ['All'], // Array<string>
        region: typeof region === 'string' ? region.split(',') : ['All'], // Array<string>
        payment: typeof payment === 'string' ? payment.split(',') : ['All'], // Array<string>
        promotion:
          typeof promotion === 'string' ? promotion.split(',') : ['All'], // Array<string>
      };

      if (filters.sort[1]) {
        filters.sortBy[filters.sort[0]] = filters.sort[1] as SortOrder;
      } else {
        filters.sortBy[filters.sort[0]] = 'asc';
      }

      const multiTagFilters = [
        'categories',
        'region',
        'payment',
        'promotion',
      ] as const;

      for (let i = 0; i < multiTagFilters.length; i++) {
        const filterName = multiTagFilters[i];
        if (filters[filterName][0] === 'All') {
          filters[filterName] = [...multiFilter[filterName]];
        } else if (typeof filters[filterName][0] === 'string') {
          filters[filterName] = filters[filterName][0].split(',');
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
