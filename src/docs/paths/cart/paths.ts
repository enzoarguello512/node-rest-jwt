import addProduct from './addProduct';
import createCart from './createCart';
import createOrRead from './createOrRead';
import getCartProductsById from './getCartProductsById';
import listCarts from './listCarts';
import patchCart from './patchCart';
import removeCart from './removeCart';
import removeCartProduct from './removeCartProduct';

const cartPaths = {
  '/cart': {
    ...listCarts,
    ...createCart,
  },
  '/cart/{id}': {
    ...patchCart,
    ...removeCart,
  },
  '/cart/{id}/products': {
    ...getCartProductsById,
  },
  '/cart/{id}/products/{productId}': {
    ...removeCartProduct,
  },
  '/cart/{id}/products/{productId}/{quantity}': {
    ...addProduct,
  },
  '/cart/{userId}/{productId}/{quantity}': {
    ...createOrRead,
  },
};

export default cartPaths;
