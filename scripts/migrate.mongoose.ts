import { Product } from '../components/product/models/product.model';
import { products } from './products.data';

(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Inserted ${products.length} products`);
  process.exit(1);
})();
