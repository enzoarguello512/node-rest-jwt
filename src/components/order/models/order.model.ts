import MongooseService from '../../../services/mongoose/mongoose.service';
import { ICreateOrderDto, IOrderProduct } from '../dto/create.order.dto';

const Schema = MongooseService.getMongoose().Schema;

export const orderProductSchema = new Schema<IOrderProduct>(
  {
    id: { type: String, required: true }, // product id
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    hasFreeShipping: { type: Boolean, required: true },
    discountedPrice: { type: Number, required: true },
  },
  { _id: false }
);

export const orderSchema = new Schema<ICreateOrderDto>(
  {
    user: { type: 'ObjectId', ref: 'User', required: true },
    products: [
      {
        _id: false,
        data: orderProductSchema, // sub-document
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true, default: 'Incomplete' },
    deliveryAddress: { type: String, required: true },
    contact: {
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
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
