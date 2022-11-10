import { populateMongoDb } from './functions.mongoose';

(async () => {
  const productsQuantity = await populateMongoDb();
  console.log(`Inserted ${productsQuantity} products`);
  process.exit(1);
})();
