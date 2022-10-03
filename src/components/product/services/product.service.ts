import { ICrud } from '../../../common/types/crud.interface';
import { ICreateProductDto } from '../dto/create.product.dto';
import { IPatchProductDto } from '../dto/patch.product.dto';
import FactoryInstance from '../daos/product.factory.dao';

class ProductsService implements ICrud {
  async create(resource: ICreateProductDto): Promise<any> {
    return (await FactoryInstance).create(resource);
  }

  async deleteById(id: string): Promise<any> {
    return (await FactoryInstance).deleteById(id);
  }

  async list(limit?: number, page?: number): Promise<any> {
    return (await FactoryInstance).list(limit, page);
  }

  async patchById(id: string, resource: IPatchProductDto): Promise<any> {
    return (await FactoryInstance).patchById(id, resource);
  }

  async readById(id: string): Promise<any> {
    return (await FactoryInstance).readById(id);
  }
}

export default new ProductsService();
