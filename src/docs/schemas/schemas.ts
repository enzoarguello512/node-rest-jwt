import cartSchema from './cart/schema';
import baseErrorSchema from './error/baseError';
import messageSchema from './message/schema';
import orderSchema from './order/schema';
import productSchema from './products/schema';
import userSchema from './user/schema';

const schemas = {
  Cart: cartSchema,
  Message: messageSchema,
  Order: orderSchema,
  Product: productSchema,
  User: userSchema,
  BaseError: baseErrorSchema,
};

export default schemas;
