const addProduct = {
  post: {
    tags: ['Cart'],
    description: 'Add a new product to an existing cart.',
    operationId: 'addProduct',
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
        description: 'Some of the parameters entered are incorrect',
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

export default addProduct;
