import { CallbackError } from 'mongoose';
import { BadRequestError } from '../../../common/error/bad.request.error';
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
      required: true,
      default: 0,
    },
    discountedPrice: Number,
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

productSchema.pre(
  'insertMany',
  function (
    next: (err?: CallbackError) => void,
    docs: Array<ICreateProductDto>
  ) {
    if (Array.isArray(docs) && docs.length) {
      docs.forEach((product) => {
        product.discountedPrice =
          product.price - (product.price * product.discount) / 100;
      });
      next();
    } else {
      return next(
        new BadRequestError('Product list should not be empty', 'insertMany')
      ); // lookup early return pattern
    }
  }
);

productSchema.pre('save', function (next) {
  this.discountedPrice = this.price - (this.price * this.discount) / 100;
  next();
});

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
