import MongooseService from '../../../services/mongoose/mongoose.service';
import { ICreateOrderDto, IOrderProduct } from '../dto/create.order.dto';

const Schema = MongooseService.getMongoose().Schema;

export const orderProductSchema = new Schema<IOrderProduct>(
  {
    id: { type: String, required: true, description: 'Product id' },
    name: { type: String, required: true, description: 'Product name' },
    description: {
      type: String,
      required: true,
      description: 'Product description',
    },
    imageUrl: {
      type: String,
      required: true,
      description: 'Product image url',
    },
    hasFreeShipping: {
      type: Boolean,
      required: true,
      description: 'Boolean indicating if the product has free shipping',
    },
    discountedPrice: {
      type: Number,
      required: true,
      description: 'Final price of the product once the discount is subtracted',
    },
  },
  { _id: false }
);

export const orderSchema = new Schema<ICreateOrderDto>(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
      description: 'User id',
    },
    products: {
      type: [
        {
          _id: false,
          data: orderProductSchema, // sub-document
          quantity: {
            type: Number,
            required: true,
            description: 'Product quantity',
          },
        },
      ],
      required: true,
      description: 'Array of {product ids and quantities}',
    },
    total: {
      type: Number,
      required: true,
      description: 'Sum of the total value of the products within the order',
    },
    status: {
      type: String,
      required: true,
      default: 'Incomplete',
      description: 'Order status',
      enum: ['Incomplete', 'Complete'],
    },
    deliveryAddress: {
      type: String,
      required: true,
      description: 'Order delivery address',
    },
    contact: {
      type: {
        email: { type: String, required: true, description: 'User email' },
        phoneNumber: {
          type: String,
          required: true,
          description: 'User phone number',
        },
      },
      required: true,
      description: 'Contact information with the owner of the order',
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Order = MongooseService.getMongoose().model<ICreateOrderDto>(
  'Order',
  orderSchema
);
