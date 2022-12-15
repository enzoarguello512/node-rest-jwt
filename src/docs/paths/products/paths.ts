import createProduct from './createProduct';
import getProductById from './getProductById';
import listProducts from './listProducts';
import listProductsByFilter from './listProductsByFilter';
import patchProduct from './patchProduct';
import removeProduct from './removeProduct';

const productsPaths = {
  '/products': {
    ...listProducts,
    ...createProduct,
  },
  '/products/filter': {
    ...listProductsByFilter,
  },
  '/products/{id}': {
    ...getProductById,
    ...removeProduct,
    ...patchProduct,
  },
};

export default productsPaths;
