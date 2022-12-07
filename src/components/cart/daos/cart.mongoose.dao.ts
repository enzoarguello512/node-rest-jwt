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

  public async readByUserId(userId: string) {
    try {
      return Cart.findOne({ user: userId }).populate('products.data').exec();
    } catch (err) {
      throw new BaseError('Failed to find cart', err, 'readByUserId');
    }
  }

  /*
   * This method has 2 functionalities
   * 1. If the user already has a shopping cart assigned, the new product will be added and the updated shopping cart will be returned.
   * 2. In case the user does not have a shopping cart, a new one will be created, the references will be made (between the user and the new cart) and finally the product will be added to the new cart and will return to the user
   */
  public createOrRead = async (
    user: ICreateUserDto,
    product: ICreateProductDto,
    quantity = 1
  ) => {
    try {
      // We add the product in case the cart already exists
      if (user?.cart) {
        const prevCart = await this.readById(String(user.cart));
        return await this.addProduct(
          product,
          prevCart as ICreateCartDto,
          quantity
        );
      } else {
        // We create a new cart (with the product already included) in case there is no previous one
        const formatProduct = {
          products: [{ data: product._id, quantity }],
        } as ICreateCartDto;
        const newCart = await this.create(formatProduct);

        // We add the references between the user and the cart
        user.cart = newCart._id;
        await user.save();
        newCart.user = user._id;
        await newCart.save();

        // We do this only to correctly display the message to the frontend, because in MongoDB we only store the "id" and not the entire product
        newCart.products[0] = {
          data: product,
          quantity,
        };

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
      // We check if the product is already in the cart
      const productIndex: number = cart.products.findIndex(
        (item) => item.data.id === product.id
      );

      if (productIndex === -1) {
        // In case the product is not in the cart we will add it
        cart.products.push({ data: product._id, quantity });
      } else {
        // And in case it is already, we are going to change only the amount/quantity
        cart.products[productIndex].quantity = quantity;
      }

      await cart.save();

      // We do this only to correctly display the message to the frontend, because in MongoDB we only store the "id" and not the entire product
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
      // We check if the product is already in the cart
      const productIndex: number = cart.products.findIndex(
        (item) => item.data.id === product.id
      );

      // If the product is actually in the cart, we will delete it
      if (productIndex !== -1) {
        cart.products = cart.products.filter(
          (item) => item.data.id !== product.id
        );
        return await cart.save();
      }

      // In case the product is not in the cart
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
