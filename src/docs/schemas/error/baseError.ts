const baseErrorSchema = {
  type: 'object',
  description: 'Error structure.',
  properties: {
    message: {
      type: 'string',
      description: 'Error message.',
      example: 'Generic error',
    },
    error: {
      type: 'string',
      description: 'Error internal code.',
      example: '-4',
    },
    name: {
      type: 'string',
      description: 'Error name.',
    },
    httpCode: {
      type: 'number',
      description: 'Error http code.',
    },
    log: {
      type: 'string',
      description: 'Error log.',
    },
    methodName: {
      type: 'string',
      description: 'Method where the error was generated.',
    },
    isOperational: {
      type: 'boolean',
      description:
        'Boolean indicating if the error is operational (true) or not (false).',
    },
  },
};

export default baseErrorSchema;
