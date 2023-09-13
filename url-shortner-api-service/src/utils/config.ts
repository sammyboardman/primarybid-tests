// config.ts
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define your configuration object
const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DB_URI || 'mongodb://localhost:27017',
  serverUrl: process.env.SERVER_URL || `localhost:${ process.env.PORT}`,
  nodeEnv: process.env.NODE_ENV,
  shortnerBaseUrl: process.env.SHORTNER_BASE_URL || 'https://pbid.io'
};

export default config;
