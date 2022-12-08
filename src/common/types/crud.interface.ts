import { ICreateCartDto } from '../../components/cart/dto/create.cart.dto';
import { ICreateProductDto } from '../../components/product/dto/create.product.dto';
import { ICreateUserDto } from '../../components/user/dto/create.user.dto';
import { IProductFilters } from './product.filters';

// Interface in charge of services and dao's
// Generics could be used
export interface ICrud {
  create: (resource: any) => Promise<any>;
  list: (limit?: number, page?: number) => Promise<any>;
  readById: (id: string) => Promise<any>;
  patchById: (id: string, resource: any) => Promise<any>;
  deleteById: (resource: any) => Promise<any>;
}

export interface ICrudProduct extends ICrud {
  listByFilter: (filters: IProductFilters) => Promise<any>;
}

export interface ICrudCart extends ICrud {
  createOrRead: (
    user: ICreateUserDto,
    product: ICreateProductDto,
    quantity: number
  ) => Promise<any>;
  addProduct: (
    product: ICreateProductDto,
    cart: ICreateCartDto,
    quantity: number
  ) => Promise<any>;
  deleteProductById: (
    product: ICreateProductDto,
    cart: ICreateCartDto
  ) => Promise<any>;
  readByUserId: (userId: string) => Promise<any>;
}

export interface ICrudDerivedToUser extends ICrud {
  listUserItemsCollection: (
    userId: string,
    limit?: number,
    page?: number
  ) => Promise<any>;
}

export interface ICrudMessage extends ICrudDerivedToUser {
  generateSystemMessage: (userId: string, message: string) => Promise<string>;
}

export interface ICrudUser extends ICrud {
  getUserByEmail: (email: string) => Promise<any>;
  getUserByEmailWithPassword: (email: string) => Promise<any>;
  getUserByRefreshToken: (email: string) => Promise<any>;
}
