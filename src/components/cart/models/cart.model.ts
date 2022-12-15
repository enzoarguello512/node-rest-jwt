import MongooseService from '../../../services/mongoose/mongoose.service';
import { ICreateCartDto } from '../dto/create.cart.dto';

const Schema = MongooseService.getMongoose().Schema;

export const cartSchema = new Schema<ICreateCartDto>(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
      required: false,
      description: 'User id',
    },
    products: {
      type: [
        {
          _id: false,
          data: { type: 'ObjectId', ref: 'Product', description: 'Product id' },
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
  },
  {
    timestamps: true,
  }
);

cartSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Cart = MongooseService.getMongoose().model<ICreateCartDto>(
  'Cart',
  cartSchema
);
