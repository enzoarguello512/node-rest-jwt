const getCartProductsById = {
  get: {
    tags: ['Cart'],
    description: 'Get a specific cart.',
    operationId: 'getCartById',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/CartId',
        },
        required: true,
        description: 'A single cart id',
      },
    ],
    responses: {
      200: {
        description: 'Cart was obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Cart',
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
        description: 'The cart does not exist.',
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

export default getCartProductsById;
