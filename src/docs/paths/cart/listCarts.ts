const listCarts = {
  get: {
    tags: ['Cart'],
    description: 'Get all carts.',
    operationId: 'listCarts',
    parameters: [],
    responses: {
      200: {
        description: 'List of obtained carts',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of carts.',
              items: {
                $ref: '#/components/schemas/Cart',
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
export default listCarts;
