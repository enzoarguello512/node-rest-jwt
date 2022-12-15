import express from 'express';
import productService from '../services/product.service';
import { Error as MongoError, SortOrder } from 'mongoose';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { filtersArray } from '../../../scripts/products.filters';

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
          `Missing required fields: name, description, image (must be a image, not a string!), hasFreeShipping, discount, price, stock`,
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
        categories,
        region,
        payment,
        promotion,
      } = req.query;

      const filters = {
        page: typeof page === 'string' ? parseInt(page) - 1 : 0, // number
        limit: typeof limit === 'string' ? parseInt(limit) : 16, // number
        search: typeof search === 'string' ? search : '', // string
        sort: Array.isArray(sort) ? sort : ['id'], // Array<string>
        sortBy: {} as { [key: string]: SortOrder }, // Object
        categories: [] as Array<string>, // Array<string>
        region: [] as Array<string>, // Array<string>
        payment: [] as Array<string>, // Array<string>
        promotion: [] as Array<string>, // Array<string>
      };

      if (filters.sort[1] && typeof filters.sort[0] === 'string') {
        filters.sortBy[filters.sort[0]] = filters.sort[1] as SortOrder;
      } else if (typeof filters.sort[0] === 'string') {
        filters.sortBy[filters.sort[0]] = 'asc';
      }

      const tagsArray = [
        'categories',
        'region',
        'payment',
        'promotion',
      ] as const;

      const variablesArray = [categories, region, payment, promotion];

      for (let i = 0; i < tagsArray.length; i++) {
        // Variables
        const propName = tagsArray[i];
        const queryVariable = variablesArray[i];
        const defaultTagsArray: Array<string> = filtersArray[propName];

        if (typeof queryVariable === 'string') {
          filters[propName] = [queryVariable];
        } else if (Array.isArray(queryVariable)) {
          filters[propName] = queryVariable as Array<string>;
        } else {
          filters[propName] = [...defaultTagsArray];
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
