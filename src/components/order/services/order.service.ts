import { ICrudDerivedToUser } from '../../../common/types/crud.interface';
import { ICreateOrderDto } from '../dto/create.order.dto';
import { IPatchOrderDto } from '../dto/patch.order.dto';
import FactoryInstance from '../daos/order.factory.dao';

class OrdersService implements ICrudDerivedToUser {
  async create(resource: ICreateOrderDto): Promise<any> {
    return (await FactoryInstance).create(resource);
  }

  async deleteById(resource: ICreateOrderDto): Promise<any> {
    return (await FactoryInstance).deleteById(resource);
  }

  async list(limit?: number, page?: number): Promise<any> {
    return (await FactoryInstance).list(limit, page);
  }

  async patchById(id: string, resource: IPatchOrderDto): Promise<any> {
    return (await FactoryInstance).patchById(id, resource);
  }

  async readById(id: string): Promise<any> {
    return (await FactoryInstance).readById(id);
  }

  async listUserItemsCollection(
    userId: string,
    limit?: number,
    page?: number
  ): Promise<any> {
    return (await FactoryInstance).listUserItemsCollection(userId, limit, page);
  }
}

export default new OrdersService();
