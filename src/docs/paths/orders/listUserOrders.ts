const listUserOrders = {
  get: {
    tags: ['Orders'],
    description: 'Get all orders from a specific user.',
    operationId: 'listUserOrders',
    security: [
      {
        jwtBearerAuth: [],
      },
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'A single user id',
      },
    ],
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
      404: {
        description: 'The order does not exist.',
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

export default listUserOrders;
