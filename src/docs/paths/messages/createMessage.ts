const createMessage = {
  post: {
    tags: ['Messages'],
    description: 'Create a new message.',
    operationId: 'createMessage',
    security: [
      {
        jwtBearerAuth: [],
      },
    ],
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Message',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Message',
            },
          },
        },
      },
      400: {
        description:
          'One or more of the message properties do not meet the proper conditions.',
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

export default createMessage;
