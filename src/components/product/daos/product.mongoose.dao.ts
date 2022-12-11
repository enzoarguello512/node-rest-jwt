import mongoose from 'mongoose';
import debug from 'debug';
import { ICreateProductDto } from '../dto/create.product.dto';
import { IPatchProductDto } from '../dto/patch.product.dto';
import BaseError from '../../../common/error/base.error';
import { ICrud } from '../../../common/types/crud.interface';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Product } from '../models/product.model';
import CloudinaryService from '../../../services/cloudinary/cloudinary.service';
import { UploadedFile } from 'express-fileupload';
import { IProductFilters } from '../../../common/types/product.filters';

const log: debug.IDebugger = debug('app:products-dao');

class ProductsDao implements ICrud {
  constructor() {
    log('Created new instance of ProductsDao');
  }

  public async create(productFields: ICreateProductDto): Promise<string> {
    try {
      const product = new Product(productFields);
      const image = productFields.imageId as UploadedFile;
      const { public_id, secure_url } = await CloudinaryService.uploadImage(
        image,
        'Products'
      );
      product.imageId = public_id;
      product.imageUrl = secure_url;
      await product.save();
      return product.id;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'create');
      } else if (err instanceof BaseError) throw err;
      throw new BaseError('Failed to save product', err, 'create');
    }
  }

  public async deleteById(product: ICreateProductDto) {
    try {
      // In case our product has an image, we will delete it too
      if (
        typeof product.imageId === 'string' &&
        product.imageId.split('/')[1] !== 'base' // we check not to delete the "base" images
      ) {
        await CloudinaryService.deleteImage(product.imageId);
      }
      return Product.deleteOne({ _id: product.id }).exec();
    } catch (err) {
      if (err instanceof BaseError) throw err;
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

  public async list(limit = 0, page = 5) {
    return Product.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  public async listByFilter(filters: IProductFilters) {
    const {
      page,
      limit,
      search,
      //sort,
      sortBy,
      categories,
      region,
      payment,
      promotion,
    } = filters;

    const products = await Product.find({
      name: { $regex: search, $options: 'i' },
    })
      .where('categories')
      .in([...categories])
      .where('region')
      .in([...region])
      .where('payment')
      .in([...payment])
      .where('promotion')
      .in([...promotion])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Product.countDocuments({
      categories: { $in: [...categories] },
      region: { $in: [...region] },
      payment: { $in: [...payment] },
      promotion: { $in: [...promotion] },
      name: { $regex: search, $options: 'i' },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      //filtersAvailable: {
      //categories,
      //region,
      //payment,
      //promotion,
      //},
      products,
    };

    return response;
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
