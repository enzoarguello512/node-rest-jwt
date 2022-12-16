const patchCart = {
  patch: {
    tags: ['Cart'],
    description:
      'Update an existing cart, only available for logged in admin user.',
    operationId: 'patchCart',
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
    requestBody: {
      required: 'true',
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/components/schemas/Cart',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Cart updated successfully.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Cart',
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
      404: {
        description: 'The cart to update does not exist.',
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

export default patchCart;
