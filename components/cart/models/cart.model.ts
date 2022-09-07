import MongooseService from '../../../services/mongoose/mongoose.service';

const Schema = MongooseService.getMongoose().Schema;

export const cartSchema = new Schema(
  {
    products: [
      {
        _id: false,
        data: { type: 'ObjectId', ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
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

export const Cart = MongooseService.getMongoose().model('Cart', cartSchema);
