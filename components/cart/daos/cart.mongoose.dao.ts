import mongoose from 'mongoose';
import debug from 'debug';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { IPatchCartDto } from '../dto/patch.cart.dto';
import BaseError from '../../../common/error/base.error';
import { ICrudCart } from '../../../common/types/crud.interface';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Cart } from '../models/cart.model';
import { ICreateProductDto } from '../../product/dto/create.product.dto';
import { NotFoundError } from '../../../common/error/not.found.error';

const log: debug.IDebugger = debug('app:carts-dao');

export class CartsDao implements ICrudCart {
  constructor() {
    log('Created new instance of CartsDao');
  }

  public async create(cartFields: ICreateCartDto): Promise<string> {
    try {
      const cart = new Cart(cartFields);
      await cart.save();
      return cart.id;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'create');
      }
      throw new BaseError('Failed to save cart', err, 'create');
    }
  }

  public async list(limit = 25, page = 0) {
    return Cart.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  public async readById(cartId: string) {
    try {
      return Cart.findOne({ _id: cartId }).populate('products.data').exec();
    } catch (err) {
      throw new BaseError('Failed to find cart', err, 'readById');
    }
  }

  public async patchById(cartId: string, cartFields: IPatchCartDto) {
    try {
      const existingCart = await Cart.findOneAndUpdate(
        { _id: cartId },
        { $set: cartFields },
        { new: true }
      ).exec();

      return existingCart;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'patchById');
      }
      throw new BaseError('Failed to update cart', err, 'patchById');
    }
  }

  public async deleteById(cartId: string) {
    try {
      return Cart.deleteOne({ _id: cartId }).exec();
    } catch (err) {
      throw new BaseError('Failed to remove cart', err, 'deleteById');
    }
  }

  public async addProduct(product: ICreateProductDto, cart: ICreateCartDto) {
    try {
      const productIndex: number = cart.products.findIndex(
        (item) => item.data.id === product.id
      );
      if (productIndex === -1) {
        cart.products.push({ data: product, quantity: 1 });
      } else {
        cart.products[productIndex].quantity += 1;
      }
      return await cart.save();
    } catch (err) {
      throw new BaseError('Failed to add product to cart', err, 'addProduct');
    }
  }

  public async deleteProductById(
    product: ICreateProductDto,
    cart: ICreateCartDto
  ) {
    try {
      const productIndex: number = cart.products.findIndex(
        (item) => item.data.id === product.id
      );
      if (productIndex !== -1) {
        cart.products = cart.products.filter(
          (item) => item.data.id !== product.id
        );
        return await cart.save();
      }
      throw new NotFoundError('Product not found in cart', 'deleteProductById');
    } catch (err) {
      if (err instanceof BaseError) throw err;
      throw new BaseError(
        'Failed to remove product from cart',
        err,
        'deleteProductById'
      );
    }
  }
}

export default new CartsDao();
