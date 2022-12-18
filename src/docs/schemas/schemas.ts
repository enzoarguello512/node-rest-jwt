import cartSchema from './cart/schema';
import baseErrorSchema from './error/baseError';
import messageSchema from './message/schema';
import orderSchema from './order/schema';
import productSchema from './products/schema';
import loggedUserSchema from './user/loggedUserSchema';
import userSchema from './user/schema';

const schemas = {
  Cart: cartSchema,
  Message: messageSchema,
  Order: orderSchema,
  Product: productSchema,
  User: userSchema,
  Error: baseErrorSchema,
  //LoggedUser: loggedUserSchema,
  AccessToken: {
    type: 'object',
    title: 'Access token',
    description: 'User access token at login',
    properties: {
      accessToken: {
        type: 'string',
      },
    },
  },
};

export default schemas;
