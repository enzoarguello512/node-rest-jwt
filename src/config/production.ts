import dotenv from 'dotenv';
import { EPersistenceType } from '../common/types/factory.persistence.enum';

// Enable environment variables
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  console.info(`Error: possibly the ".env" file is missing, the server can still run as long 
                as it has the environment variables. Check the following link to know what variables
                the project should have: https://github.com/enzoarguello512/node-rest-jwt/blob/main/.env.example`);

  console.error(dotenvResult.error);
}

const defaultConfig = {
  server: {
    port: process.env.PORT || 8080,
    domain: process.env.DOMAIN || '0.0.0.0',
    /**
     * Persistence is equal to:
     * 'memory' | 'filesystem' | 'mysql' | 'sqlite3' | 'mongolocal' | 'mongoatlas' | 'firebase';
     */
    persistence: process.env.PERSISTENCE || EPersistenceType.mongoatlas,
    mode: process.env.MODE,
    session: {
      secret: process.env.SESSION_SECRET || 'secret',
      // Timeout in minutes
      cookietimeout: process.env.SESSION_COOKIE_TIMEOUT || '10',
    },
  },
  jwt: {
    // Secrets
    accesstoken: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
    refreshtoken: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
  },
  databases: {
    mongolocal: {
      port: process.env.MONGO_LOCAL_PORT || 27017,
      host: process.env.MONGO_LOCAL_HOST || '0.0.0.0',
      database: process.env.MONGO_LOCAL_DB || 'mongolocaldb',
    },
    mongoatlas: {
      user: process.env.MONGO_ATLAS_USER || 'user',
      password: process.env.MONGO_ATLAS_PASSWORD || 'password',
      clusterurl: process.env.MONGO_ATLAS_CLUSTER_URL || 'clusterurl',
      database: process.env.MONGO_ATLAS_DB || 'mongoatlasdb',
    },
  },
};

export default defaultConfig;
