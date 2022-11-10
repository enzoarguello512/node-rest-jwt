import { Product } from '../components/product/models/product.model';
import { products } from './products.data';

export const populateMongoDb = async (): Promise<number> => {
  await Product.deleteMany({});
  await Product.insertMany(products, {
    ordered: true,
  });
  return products.length;
};
