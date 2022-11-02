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
    imageId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    hasFreeShipping: {
      type: Boolean,
      required: true,
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

// Middleware that runs BEFORE using mongoose's "insertMany" method
// I made a custom function that is responsible for calculating the discountedPrice of each product before it is inserted into the database
// Mostly used by the "./populate.mongoose.ts" script
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

// Responsible for calculating the discountedPrice of the product
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
