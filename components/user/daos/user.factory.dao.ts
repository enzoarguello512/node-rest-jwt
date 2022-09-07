import { ICrudUser } from '../../../common/types/crud.interface';
import { TKeys } from '../../../common/types/factory.persistence.enum';
import config from 'config';

class UserFactory {
  static async get(key: TKeys): Promise<ICrudUser> {
    if (key === 'mongoatlas' || key === 'mongolocal') key = 'mongoose';
    const { default: UserDao } = await import(`./user.${key}.dao`);
    return UserDao;
    // return new UserDao();
  }
}

const persistenceType = config.get<TKeys>('server.persistence');

export default UserFactory.get(persistenceType);
