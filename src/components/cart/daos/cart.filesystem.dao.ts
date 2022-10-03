import fs from 'fs';
import debug from 'debug';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { nanoid } from 'nanoid';
import path from 'path';
// @ts-expect-error
import { localDB } from '@abmsourav/localdb';
import BaseError from '../../../common/error/base.error';
import { ICreateProductDto } from '../../product/dto/create.product.dto';
import { ICrud } from '../../../common/types/crud.interface';

const log: debug.IDebugger = debug('app:filesystem-dao');

class CartsDao implements ICrud {
  private readonly filename = path.join(__dirname, 'carts.filesystem.db.json');
  private readonly crud = localDB(this.filename);

  constructor() {
    this.init();
    log('Created new instance of CartsDao');
  }

  private init(): void {
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '');
      log('Database not found, created carts.db');
    }
  }

  public async create(cart: ICreateCartDto) {
    try {
      cart.id = nanoid();
      cart.createdAt = new Date();
      await this.crud.set(cart);
      return cart.id;
    } catch (err) {
      throw new BaseError('Failed to save cart', err, 'create');
    }
  }

  public async addProduct(cartId: string, products: Array<ICreateProductDto>) {
    try {
      const cart = await this.crud.search('id', cartId);
      const allowedPutFields = ['products'];
      const newProducts = cart.products.concat(products);
      await this.crud.update(
        { id: cartId },
        { products: newProducts },
        allowedPutFields
      );
      return `${cart.id} updated`;
    } catch (err) {
      throw new BaseError('Failed to save cart', err, 'addProduct');
    }
  }

  public async list() {
    try {
      return await this.crud.get();
    } catch (err) {
      throw new BaseError('Carts could not be loaded', err, 'list');
    }
  }

  public async readById(cartId: string) {
    try {
      return await this.crud.search('id', cartId);
    } catch (err) {
      throw new BaseError('Could not get the cart', err, 'readById');
    }
  }

  public async patchById(cartId: string) {
    try {
      return 'Not implemented';
    } catch (err) {
      throw new BaseError('Could not patch the cart', err, 'patchById');
    }
  }

  public async deleteById(cartId: string) {
    try {
      await this.crud.remove({ id: cartId });
      return `${cartId} removed`;
    } catch (err) {
      throw new BaseError('Failed to remove cart', err, 'deleteById');
    }
  }

  public async removeCartProductById(cartId: string, productId: string) {
    try {
      const cart = await this.crud.search('id', cartId);
      const allowedPutFields = ['products'];
      const newProducts = cart.products.filter(
        (product: ICreateProductDto) => product.id !== productId
      );
      await this.crud.update(
        { id: cartId },
        { products: newProducts },
        allowedPutFields
      );
      return `${cart.id} updated`;
    } catch (err) {
      throw new BaseError(
        'Failed to remove product',
        err,
        'removeCartProductById'
      );
    }
  }
}

export default new CartsDao();
