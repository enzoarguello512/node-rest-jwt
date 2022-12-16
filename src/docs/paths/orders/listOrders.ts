const listOrders = {
  get: {
    tags: ['Orders'],
    description: 'Get all orders.',
    operationId: 'listOrders',
    parameters: [],
    responses: {
      200: {
        description: 'List of obtained orders',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of orders.',
              items: {
                $ref: '#/components/schemas/Order',
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

export default listOrders;
