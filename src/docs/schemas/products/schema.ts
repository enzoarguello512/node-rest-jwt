const productSchema = {
  type: 'object',
  description: 'A product.',
  properties: {
    id: {
      type: 'string',
      description: 'Product identification id',
      example: '61717f366466441a1936e9fa',
    },
  },
};

export default productSchema;
