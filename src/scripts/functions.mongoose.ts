import { Product } from '../components/product/models/product.model';
import { products } from './products.data';
import { products as productsv2 } from './products.data-v2';

const itemsToInsert = productsv2;

export const populateMongoDb = async (): Promise<number> => {
  //await Product.deleteMany({});
  await Product.insertMany(productsv2, {
    ordered: true,
  });
  return itemsToInsert.length;
};
