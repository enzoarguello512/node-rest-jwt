import { ICrudMessage } from '../../../common/types/crud.interface';
import { ICreateMessageDto } from '../dto/create.message.dto';
import { IPatchMessageDto } from '../dto/patch.message.dto';
import FactoryInstance from '../daos/message.factory.dao';

class MessagesService implements ICrudMessage {
  async create(resource: ICreateMessageDto): Promise<any> {
    return (await FactoryInstance).create(resource);
  }

  async deleteById(id: string): Promise<any> {
    return (await FactoryInstance).deleteById(id);
  }

  async list(limit?: number, page?: number): Promise<any> {
    return (await FactoryInstance).list(limit, page);
  }

  async patchById(id: string, resource: IPatchMessageDto): Promise<any> {
    return (await FactoryInstance).patchById(id, resource);
  }

  async readById(id: string): Promise<any> {
    return (await FactoryInstance).readById(id);
  }

  async listUserMessages(
    userId: string,
    limit?: number,
    page?: number
  ): Promise<any> {
    return (await FactoryInstance).listUserMessages(userId, limit, page);
  }
}

export default new MessagesService();
