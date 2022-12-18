const removeCartProduct = {
  delete: {
    tags: ['Cart'],
    description: 'Remove a product from a specific cart.',
    operationId: 'removeCartProduct',
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
      {
        name: 'productId',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'A single product id',
      },
    ],
    responses: {
      204: {
        description: 'Cart product deleted successfully.',
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
        description: 'The product to delete does not exist.',
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

export default removeCartProduct;
