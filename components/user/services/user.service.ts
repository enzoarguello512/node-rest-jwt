import { ICrudUser } from '../../../common/types/crud.interface';
import { ICreateUserDto } from '../dto/create.user.dto';
import { IPatchUserDto } from '../dto/patch.user.dto';
import FactoryInstance from '../daos/user.factory.dao';

class UsersService implements ICrudUser {
  public async create(resource: ICreateUserDto) {
    return (await FactoryInstance).create(resource);
  }

  public async deleteById(id: string) {
    return (await FactoryInstance).deleteById(id);
  }

  public async list(limit?: number, page?: number) {
    return (await FactoryInstance).list(limit, page);
  }

  public async patchById(id: string, resource: IPatchUserDto): Promise<any> {
    return (await FactoryInstance).patchById(id, resource);
  }

  public async readById(id: string) {
    return (await FactoryInstance).readById(id);
  }

  public async getUserByEmail(email: string) {
    return (await FactoryInstance).getUserByEmail(email);
  }
  public async getUserByEmailWithPassword(email: string) {
    return (await FactoryInstance).getUserByEmailWithPassword(email);
  }
  public async getUserByRefreshToken(refreshToken: string) {
    return (await FactoryInstance).getUserByRefreshToken(refreshToken);
  }
}

export default new UsersService();
