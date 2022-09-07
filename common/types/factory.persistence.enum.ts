export enum EPersistenceType {
  memory = 'memory',
  filesystem = 'filesystem',
  mysql = 'mysql',
  sqlite3 = 'sqlite3',
  mongolocal = 'mongolocal',
  mongoatlas = 'mongoatlas',
  firebase = 'firebase',
}

/**
 * TKeys is equal to:
 * 'memory' | 'filesystem' | 'mysql' | 'sqlite3' | 'mongolocal' | 'mongoatlas' | 'firebase';
 * Do not use the mongoose type
 */
export type TKeys = keyof typeof EPersistenceType | 'mongoose';
