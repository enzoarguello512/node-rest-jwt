import createOrder from './createOrder';
import getOrderById from './getOrderById';
import listOrders from './listOrders';
import listUserOrders from './listUserOrders';
import patchOrder from './patchOrder';
import removeOrder from './removeOrder';

const ordersPaths = {
  '/orders': {
    ...listOrders,
  },
  '/orders/{userId}/cart/{cartId}': {
    ...createOrder,
  },
  '/orders/{id}': {
    ...getOrderById,
    ...removeOrder,
    ...patchOrder,
  },
  '/orders/user/{userId}': {
    ...listUserOrders,
  },
};

export default ordersPaths;
