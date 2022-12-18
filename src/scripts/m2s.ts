import m2s from 'mongoose-to-swagger';
import path from 'path';
import fs from 'fs/promises';
import { Product } from '../components/product/models/product.model';
import { Cart } from '../components/cart/models/cart.model';
import { Message } from '../components/message/models/message.model';
import { User } from '../components/user/models/user.model';
import { Order } from '../components/order/models/order.model';

/**
 * This script is in charge of transforming mongoose models to swagger schemas
 * It will write a new file in JSON format with the result of the operation
 */

(async function () {
  try {
    const options = {
      omitFields: ['_id'],
    };

    const result = {
      Cart: m2s(Cart, options),
      Message: m2s(Message, options),
      Order: m2s(Order, options),
      Product: m2s(Product, options),
      User: m2s(User, options),
    };

    result.Product.properties.image = {
      type: 'string',
      description: 'Product image',
      format: 'binary',
    };
    result.Product.required.push('image');
    result.User.properties.image = {
      type: 'string',
      required: false,
      description: 'User image',
      format: 'binary',
    };

    const pathString = path.join(__dirname, 'm2sResult.json');

    await fs.writeFile(pathString, JSON.stringify(result, null, '\t'));

    console.log(`File ${pathString} written correctly`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(1);
  }
})();
