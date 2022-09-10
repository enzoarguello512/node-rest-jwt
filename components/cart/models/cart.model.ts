import MongooseService from '../../../services/mongoose/mongoose.service';
import { ICreateCartDto } from '../dto/create.cart.dto';

const Schema = MongooseService.getMongoose().Schema;

export const cartSchema = new Schema<ICreateCartDto>(
  {
    products: [
      {
        _id: false,
        data: { type: 'ObjectId', ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
    user: { type: 'ObjectId', ref: 'User', required: false },
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
