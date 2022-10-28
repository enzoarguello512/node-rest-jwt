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
import { ICreateUserDto } from '../../user/dto/create.user.dto';

const log: debug.IDebugger = debug('app:carts-dao');

export class CartsDao implements ICrudCart {
  constructor() {
    log('Created new instance of CartsDao');
  }

  public async create(cartFields: ICreateCartDto): Promise<any> {
    try {
      const cart = new Cart(cartFields);
      await cart.save();
      return cart;
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

  public createOrRead = async (
    user: ICreateUserDto,
    product: ICreateProductDto,
    quantity = 1
  ) => {
    try {
      if (user?.cart) {
        const prevCart = await this.readById(String(user.cart));
        return await this.addProduct(
          product,
          prevCart as ICreateCartDto,
          quantity
        );
      } else {
        const formatProduct = {
          products: [{ data: product._id, quantity }],
        } as ICreateCartDto;
        const newCart = await this.create(formatProduct);

        user.cart = newCart._id;
        await user.save();
        newCart.user = user._id;
        await newCart.save();

        newCart.products[0].data = product;
        return await newCart;
      }
    } catch (err) {
      throw new BaseError('Failed to create/read cart', err, 'createOrRead');
    }
  };

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

  public async deleteById(cart: ICreateCartDto) {
    try {
      return Cart.deleteOne({ _id: cart.id }).exec();
    } catch (err) {
      throw new BaseError('Failed to remove cart', err, 'deleteById');
    }
  }

  public async addProduct(
    product: ICreateProductDto,
    cart: ICreateCartDto,
    quantity = 1
  ) {
    try {
      const productIndex: number = cart.products.findIndex(
        (item) => item.data.id === product.id
      );

      if (productIndex === -1) {
        cart.products.push({ data: product._id, quantity });
      } else {
        cart.products[productIndex].quantity = quantity;
      }

      await cart.save();

      if (productIndex === -1) {
        cart.products[cart.products.length - 1].data = product;
      } else {
        cart.products[productIndex].data = product;
      }

      return cart;
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
