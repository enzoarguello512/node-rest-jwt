const patchProduct = {
  patch: {
    tags: ['Products'],
    description: 'Update an existing product.',
    operationId: 'patchProduct',
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
        description: 'A single product id',
      },
    ],
    requestBody: {
      required: 'true',
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/components/schemas/Product',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Product updated successfully.',
      },
      400: {
        description:
          'One or more of the product properties do not meet the proper conditions.',
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
        description: 'The product to update does not exist.',
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

export default patchProduct;
