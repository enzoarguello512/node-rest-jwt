const removeOrder = {
  delete: {
    tags: ['Orders'],
    description: 'Deletes an existing order.',
    operationId: 'removeOrder',
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
        description: 'A single order id',
      },
    ],
    responses: {
      204: {
        description: 'Order deleted successfully.',
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
        description: 'The order to delete does not exist.',
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

export default removeOrder;
