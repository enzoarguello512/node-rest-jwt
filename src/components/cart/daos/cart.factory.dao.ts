import { ICrudCart } from '../../../common/types/crud.interface';
import { TKeys } from '../../../common/types/factory.persistence.enum';
import config from 'config';

class CartFactory {
  static async get(key: TKeys): Promise<ICrudCart> {
    if (key === 'mongoatlas' || key === 'mongolocal') key = 'mongoose';
    const { default: CartDao } = await import(`./cart.${key}.dao`);
    return CartDao;
    // return new CartDao();
  }
}

const persistenceType = config.get<TKeys>('server.persistence');

export default CartFactory.get(persistenceType);
