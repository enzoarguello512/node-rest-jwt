import MongooseService from '../../../services/mongoose/mongoose.service';
import { ICreateProductDto } from '../dto/create.product.dto';

const Schema = MongooseService.getMongoose().Schema;

export const productSchema = new Schema<ICreateProductDto>(
  {
    name: { type: String, required: true },
    description: String,
    productCode: Number,
    imageUrl: {
      type: String,
      required: false,
      default: '',
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    hasFreeShipping: {
      type: Boolean,
      required: false,
      default: false,
    },
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    promotion: [String],
    categories: [String],
    region: [String],
    rating: Number,
    payment: [String],
  },
  {
    timestamps: true,
  }
);

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Product = MongooseService.getMongoose().model<ICreateProductDto>(
  'Product',
  productSchema
);
