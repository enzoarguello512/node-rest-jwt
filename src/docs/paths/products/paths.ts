import createProduct from './createProduct';
import listProducts from './listProducts';

const productsPaths = {
  '/products': {
    ...listProducts,
    ...createProduct,
  },
};

export default productsPaths;
