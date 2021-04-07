import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const isDevMode = process.env.NODE_ENV == 'development';

export const config = {
  port: +(process.env.PORT || 3000),
  debugLogging: isDevMode,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  cronJobExpression: '0 * * * *',
  mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/default',
  appSecret: process.env.APP_SECRET,
};
