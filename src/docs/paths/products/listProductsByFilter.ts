const listProductsByFilter = {
  get: {
    tags: ['Products'],
    description: 'Get all the products filtered by the query parameters.',
    operationId: 'listProductsByFilter',
    parameters: [
      {
        name: 'search',
        in: 'query',
        schema: {
          type: 'string',
        },
        required: false,
        description: 'Filter products by product name',
      },
      {
        name: 'promotion',
        in: 'query',
        schema: {
          type: 'array',
          items: {
            type: 'string',
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
          },
        },
        required: false,
        description: 'Filter products by promotion',
      },
      {
        name: 'categories',
        in: 'query',
        schema: {
          type: 'array',
          items: {
            type: 'string',
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
        },
        required: false,
        description: 'Filter products by categories',
      },
      {
        name: 'region',
        in: 'query',
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['North America', 'United States', 'Europe', 'Global'],
          },
        },
        required: false,
        description: 'Filter products by region',
      },
      {
        name: 'payment',
        in: 'query',
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['In cash', 'In 6 installments', 'In 12 installments'],
          },
        },
        required: false,
        description: 'Filter products by payment.',
      },
    ],
    responses: {
      200: {
        description: 'List of obtained products',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of products.',
              items: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
      },
      401: {
        description: 'Unauthorized route, login first and try again',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      500: {
        description: 'Server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
};

export default listProductsByFilter;
