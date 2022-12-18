import { CallbackError } from 'mongoose';
import { BadRequestError } from '../../../common/error/bad.request.error';
import MongooseService from '../../../services/mongoose/mongoose.service';
import { ICreateProductDto } from '../dto/create.product.dto';

const Schema = MongooseService.getMongoose().Schema;

export const productSchema = new Schema<ICreateProductDto>(
  {
    name: { type: String, required: true, description: 'Product name' },
    description: {
      type: String,
      required: false,
      description: 'Product description',
    },
    productCode: { type: Number, required: false, description: 'Product code' },
    imageId: {
      type: String,
      required: false,
      description:
        'Product image id when saved to cloudinary or file to upload',
    },
    imageUrl: {
      type: String,
      required: false,
      description: 'Product image url',
    },
    price: { type: Number, required: true, description: 'Product price' },
    stock: { type: Number, required: true, description: 'Product stock' },
    hasFreeShipping: {
      type: Boolean,
      required: true,
      default: false,
      description: 'Boolean indicating if the product has free shipping',
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
      description: 'Product discount',
    },
    discountedPrice: {
      type: Number,
      required: false,
      description: 'Final price of the product once the discount is subtracted',
    },
    promotion: {
      type: [String],
      required: false,
      default: ['none'],
      description: 'Product promotions',
      enum: [
        'none', // default
        '10% off',
        '20% off',
        '30% off',
        '40% off',
        '50% off',
        '60% off',
        '70% off',
        '80% off',
        '90% off',
        'Special offer',
        'New',
      ],
    },
    categories: {
      type: [String],
      required: true,
      description: 'Product categories',
      enum: [
        'Appetizers',
        'Condiments',
        'Confectionery',
        'Convenience foods',
        'Desserts',
        'Dips, pastes and spreads',
        'Dried foods',
        'Dumplings',
        'Fast food',
        'Products',
      ],
    },
    region: {
      type: [String],
      required: true,
      description: 'Product region',
      enum: [
        'North America',
        'United States',
        'Europe',
        'Global', // default
      ],
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
      description: 'Product rating',
    },
    payment: {
      type: [String],
      required: true,
      description: 'Product payment',
      enum: [
        'In cash', // default
        'In 6 installments',
        'In 12 installments',
      ],
    },
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
