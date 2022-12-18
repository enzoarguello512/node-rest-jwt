const getCartProductsById = {
  get: {
    tags: ['Cart'],
    description: 'Get the products inside a cart.',
    operationId: 'getCartProductsById',
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
        description: 'A single cart id',
      },
    ],
    responses: {
      200: {
        description: 'Cart products were obtained',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              description: 'Object containing the products',
              properties: {
                products: {
                  type: 'array',
                  description: 'Array of carts.',
                  items: {
                    $ref: '#/components/schemas/Product',
                  },
                },
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
