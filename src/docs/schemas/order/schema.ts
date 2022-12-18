const orderSchema = {
  title: 'Order',
  required: [
    'user',
    'products',
    'total',
    'status',
    'deliveryAddress',
    'contact',
  ],
  properties: {
    user: {
      type: 'string',
      description: 'User id',
    },
    products: {
      type: 'array',
      description: 'Array of {product ids and quantities}',
      items: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Product name',
              },
              description: {
                type: 'string',
                description: 'Product description',
              },
              imageUrl: {
                type: 'string',
                description: 'Product image url',
              },
              hasFreeShipping: {
                type: 'boolean',
                description:
                  'Boolean indicating if the product has free shipping',
              },
              discountedPrice: {
                type: 'number',
                description:
                  'Final price of the product once the discount is subtracted',
              },
            },
          },
          quantity: {
            type: 'number',
            description: 'Product quantity',
          },
        },
        required: ['quantity'],
      },
    },
    total: {
      type: 'number',
      description: 'Sum of the total value of the products within the order',
    },
    status: {
      type: 'string',
      enum: ['Incomplete', 'Complete'],
      description: 'Order status',
    },
    deliveryAddress: {
      type: 'string',
      description: 'Order delivery address',
    },
    contact: {
      type: 'object',
      description: 'Contact information with the owner of the order',
      properties: {
        email: {
          type: 'string',
          description: 'User email',
        },
        phoneNumber: {
          type: 'string',
          description: 'User phone number',
        },
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

export default orderSchema;
