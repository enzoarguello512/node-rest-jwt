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
  Error: baseErrorSchema,
  ProductId: {
    type: 'string',
    description: 'An id of a product',
    example: '61717f366466441a1936e9fa',
  },
};

export default schemas;
