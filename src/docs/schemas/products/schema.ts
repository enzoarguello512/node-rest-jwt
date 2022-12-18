const productSchema = {
  title: 'Product',
  required: [
    'name',
    'price',
    'stock',
    'hasFreeShipping',
    'discount',
    'categories',
    'region',
    'payment',
    'image',
  ],
  properties: {
    name: {
      type: 'string',
      description: 'Product name',
    },
    description: {
      type: 'string',
      required: false,
      description: 'Product description',
    },
    productCode: {
      type: 'number',
      required: false,
      description: 'Product code',
    },
    imageId: {
      type: 'string',
      required: false,
      description:
        'Product image id when saved to cloudinary or file to upload',
    },
    imageUrl: {
      type: 'string',
      required: false,
      description: 'Product image url',
    },
    price: {
      type: 'number',
      description: 'Product price',
    },
    stock: {
      type: 'number',
      description: 'Product stock',
    },
    hasFreeShipping: {
      type: 'boolean',
      description: 'Boolean indicating if the product has free shipping',
    },
    discount: {
      type: 'number',
      description: 'Product discount',
    },
    discountedPrice: {
      type: 'number',
      required: false,
      description: 'Final price of the product once the discount is subtracted',
    },
    promotion: {
      type: 'array',
      enum: [
        'none',
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
      required: false,
      description: 'Product promotions',
      items: {
        type: 'string',
      },
    },
    categories: {
      type: 'array',
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
      description: 'Product categories',
      items: {
        type: 'string',
      },
    },
    region: {
      type: 'array',
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
      description: 'Product region',
      items: {
        type: 'string',
      },
    },
    rating: {
      type: 'number',
      required: false,
      description: 'Product rating',
    },
    payment: {
      type: 'array',
      enum: ['In cash', 'In 6 installments', 'In 12 installments'],
      description: 'Product payment',
      items: {
        type: 'string',
      },
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    image: {
      type: 'string',
      description: 'Product image',
      format: 'binary',
    },
  },
};

export default productSchema;
