const listProducts = {
  get: {
    tags: ['Products'],
    description: 'Get all products.',
    //operationId: 'listProducts',
    parameters: [
      {
        name: 'nombre',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'A product name.',
        example: 'Shiratamako - Rice Flour',
      },
    ],
    responses: {
      200: {
        description: 'Products were obtained',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of products.',
              items: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
      },
    },
  },
};

export default listProducts;
