import MongoMemoryServer from 'mongodb-memory-server-core';

export interface Global extends NodeJS.Global {
  __MONGOINSTANCE__: MongoMemoryServer;
}
