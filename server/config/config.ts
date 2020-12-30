import * as dotenv from 'dotenv'
dotenv.config()

const isDev = process.env.NODE_ENV !== 'production'

export const config = {
  APP_NAME: 'Reduced',
  APP_VERSION: '2.0.0',
  HOST: isDev ? 'localhost' : '0.0.0.0',
  PORT: process.env.PORT ? process.env.PORT : '80',
  MONGO_URL: process.env.MONGO_URL
    ? process.env.MONGO_URL
    : 'mongodb://localhost:27017/dev',
  ALIAS_LENGTH: process.env.ALIAS_LENGTH ? process.env.ALIAS_LENGTH : 4,
  DOMAIN: process.env.DOMAIN,
  ACCESS_TOKEN_SECRET: 't4gQdVeCKqawXVOazIZ1',
  ACCESS_TOKEN_EXPIRATION: '7d',
}
