const listProducts = {
  get: {
    tags: ['Products'],
    description: 'Get all products.',
    operationId: 'listProducts',
    parameters: [],
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
              $ref: '#/components/schemas/BaseError',
            },
          },
        },
      },
      500: {
        description: 'Server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BaseError',
            },
          },
        },
      },
    },
  },
};

export default listProducts;
