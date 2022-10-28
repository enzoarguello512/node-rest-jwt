import { ICrudDerivedToUser } from '../../../common/types/crud.interface';
import { TKeys } from '../../../common/types/factory.persistence.enum';
import config from 'config';

class OrderFactory {
  static async get(key: TKeys): Promise<ICrudDerivedToUser> {
    if (key === 'mongoatlas' || key === 'mongolocal') key = 'mongoose';
    const { default: OrderDao } = await import(`./order.${key}.dao`);
    return OrderDao;
    // return new OrderDao();
  }
}

const persistenceType = config.get<TKeys>('server.persistence');

export default OrderFactory.get(persistenceType);
