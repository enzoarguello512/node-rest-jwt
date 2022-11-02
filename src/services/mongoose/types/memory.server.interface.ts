import MongoMemoryServer from 'mongodb-memory-server-core';

// Interface created to not have errors with typescript when using the global object
export interface Global extends NodeJS.Global {
  __MONGOINSTANCE__: MongoMemoryServer;
}
