import { ICrudCart } from '../../../common/types/crud.interface';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { ICreateProductDto } from '../../product/dto/create.product.dto';
import FactoryInstance from '../daos/cart.factory.dao';
import { IPatchCartDto } from '../dto/patch.cart.dto';

class CartsService implements ICrudCart {
  async create(resource: ICreateCartDto): Promise<any> {
    return (await FactoryInstance).create(resource);
  }

  async addProduct(
    product: ICreateProductDto,
    cart: ICreateCartDto
  ): Promise<any> {
    return (await FactoryInstance).addProduct(product, cart);
  }

  async deleteById(id: string): Promise<any> {
    return (await FactoryInstance).deleteById(id);
  }

  async deleteProductById(
    product: ICreateProductDto,
    cart: ICreateCartDto
  ): Promise<any> {
    return (await FactoryInstance).deleteProductById(product, cart);
  }

  async list(limit?: number, page?: number): Promise<any> {
    return (await FactoryInstance).list(limit, page);
  }

  async readById(id: string): Promise<any> {
    return (await FactoryInstance).readById(id);
  }

  async patchById(id: string, resource: IPatchCartDto): Promise<any> {
    return (await FactoryInstance).patchById(id, resource);
  }
}

export default new CartsService();
