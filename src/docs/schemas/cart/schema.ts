const cartSchema = {
  title: 'Cart',
  required: ['products'],
  properties: {
    user: {
      type: 'string',
      required: false,
      description: 'User id',
    },
    products: {
      type: 'array',
      description: 'Array of {product ids and quantities}',
      items: {
        type: 'object',
        properties: {
          data: {
            type: 'string',
            description: 'Product id',
          },
          quantity: {
            type: 'number',
            description: 'Product quantity',
          },
        },
        required: ['quantity'],
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
  },
};

export default cartSchema;
