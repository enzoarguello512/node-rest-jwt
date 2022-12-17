const patchUser = {
  patch: {
    tags: ['Users'],
    description: 'Update an existing user.',
    operationId: 'patchUser',
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
        description: 'A single user id',
      },
    ],
    requestBody: {
      required: 'true',
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/components/schemas/User',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'User updated successfully.',
      },
      400: {
        description:
          'One or more of the user properties do not meet the proper conditions.',
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
        description: 'The user to update does not exist.',
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

export default patchUser;
