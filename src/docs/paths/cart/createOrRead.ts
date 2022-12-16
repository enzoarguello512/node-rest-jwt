const createOrRead = {
  post: {
    tags: ['Cart'],
    description: 'Create or read an existing cart for a specific user.',
    operationId: 'createOrRead',
    parameters: [
      {
        name: 'userId',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'A single user id',
      },
      {
        name: 'productId',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'A single product id',
      },
      {
        name: 'quantity',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'Product quantity',
      },
    ],
    responses: {
      201: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
      400: {
        description:
          'One or more of the cart properties do not meet the proper conditions.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
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

export default createOrRead;
