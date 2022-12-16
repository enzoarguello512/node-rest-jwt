const removeCart = {
  delete: {
    tags: ['Cart'],
    description:
      'Deletes an existing cart, only available for logged in admin user.',
    operationId: 'removeCart',
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
        description: 'Cart deleted successfully.',
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
        description: 'The cart to delete does not exist.',
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

export default removeCart;
