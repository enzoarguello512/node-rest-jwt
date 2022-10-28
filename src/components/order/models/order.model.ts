import MongooseService from '../../../services/mongoose/mongoose.service';
import { ICreateOrderDto } from '../dto/create.order.dto';

const Schema = MongooseService.getMongoose().Schema;

export const orderSchema = new Schema<ICreateOrderDto>(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
    },
    text: { type: String, require: true },
    type: { type: String, require: true },
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
