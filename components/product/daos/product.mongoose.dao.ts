import mongoose from 'mongoose';
import debug from 'debug';
import { ICreateProductDto } from '../dto/create.product.dto';
import { IPatchProductDto } from '../dto/patch.product.dto';
import BaseError from '../../../common/error/base.error';
import { ICrud } from '../../../common/types/crud.interface';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Product } from '../models/product.model';

const log: debug.IDebugger = debug('app:products-dao');

class ProductsDao implements ICrud {
  constructor() {
    log('Created new instance of ProductsDao');
  }

  public async create(productFields: ICreateProductDto): Promise<string> {
    try {
      const product = new Product(productFields);
      await product.save();
      return product.id;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'create');
      }
      throw new BaseError('Failed to save product', err, 'create');
    }
  }

  public async deleteById(productId: string) {
    try {
      return Product.deleteOne({ _id: productId }).exec();
    } catch (err) {
      throw new BaseError('Failed to remove product', err, 'deleteById');
    }
  }

  public async readById(productId: string) {
    try {
      return Product.findOne({ _id: productId }).exec();
    } catch (err) {
      throw new BaseError('Failed to find product', err, 'readById');
    }
  }

  public async list(limit = 25, page = 0) {
    return Product.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  public async patchById(productId: string, productFields: IPatchProductDto) {
    try {
      const existingProduct = await Product.findOneAndUpdate(
        { _id: productId },
        { $set: productFields },
        { new: true }
      ).exec();

      return existingProduct;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'patchById');
      }
      throw new BaseError('Failed to update product', err, 'patchById');
    }
  }
}

export default new ProductsDao();
