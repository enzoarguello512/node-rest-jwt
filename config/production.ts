import dotenv from 'dotenv';
//import { EPersistenceType } from '../common/types/factory.persistence.enum';

// Enable environment variables
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  console.info(`Error: possibly the ".env" file is missing, the server can still run as long 
                as it has the environment variables.`);

  //console.error(dotenvResult.error);
}

const defaultConfig = {
  server: {
    port: process.env.PORT || 8080,
    domain: process.env.DOMAIN || '0.0.0.0',
    /**
     * Persistence is equal to:
     * 'memory' | 'filesystem' | 'mysql' | 'sqlite3' | 'mongolocal' | 'mongoatlas' | 'firebase';
     */
    persistence: process.env.PERSISTENCE || 'mongoatlas',
    mode: process.env.MODE || 'fork',
    session: {
      secret: process.env.SESSION_SECRET || 'secret',
      // Timeout in minutes
      cookietimeout: process.env.SESSION_COOKIE_TIMEOUT || '10',
    },
    loglevel: process.env.LOG_LEVEL || 'warn',
  },
  jwt: {
    // Secrets
    accesstoken: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
    refreshtoken: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
    accesstokenduration:
      process.env.JWT_ACCESS_TOKEN_DURATION || 'accesstokenduration',
    refreshtokenduration:
      process.env.JWT_REFRESH_TOKEN_DURATION || 'refreshtokenduration',
  },
  cloudinary: {
    cloudname: process.env.CLOUDINARY_CLOUD_NAME || 'cloudname',
    apikey: process.env.CLOUDINARY_API_KEY || 'apikey',
    apisecret: process.env.CLOUDINARY_API_SECRET || 'apisecret',
  },
  google: {
    email: process.env.GOOGLE_EMAIL || 'email',
    password: process.env.GOOGLE_PASSWORD || 'password',
  },
  twilio: {
    accountsid: process.env.TWILIO_ACCOUNT_SID || 'accountsid',
    authtoken: process.env.TWILIO_AUTH_TOKEN || 'authtoken',
    servicenumber: process.env.TWILIO_SERVICE_PHONE_NUMBER || 'servicenumber',
    servicenumberwa:
      process.env.TWILIO_SERVICE_WA_PHONE_NUMBER || 'servicenumber',
    receivernumber:
      process.env.TWILIO_RECEIVER_PHONE_NUMBER || 'receivernumber',
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
