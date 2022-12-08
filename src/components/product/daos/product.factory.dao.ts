import { ICrudProduct } from '../../../common/types/crud.interface';
import { TKeys } from '../../../common/types/factory.persistence.enum';
import config from 'config';

class ProductFactory {
  static async get(key: TKeys): Promise<ICrudProduct> {
    if (key === 'mongoatlas' || key === 'mongolocal') key = 'mongoose';
    const { default: ProductDao } = await import(`./product.${key}.dao`);
    return ProductDao;
    // return new ProductDao();
  }
}

const persistenceType = config.get<TKeys>('server.persistence');

export default ProductFactory.get(persistenceType);
