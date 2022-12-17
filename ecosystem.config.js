module.exports = {
  apps: [
    {
      name: 'TheMorfi',
      script:
        'cross-env NODE_ENV=development DEBUG=* ts-node-dev --inspect --respawn --transpile-only --exit-child ./src/index.ts',
      watch: true,
      time: true,
    },
  ],
};
