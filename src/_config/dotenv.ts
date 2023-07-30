import { configDotenv } from 'dotenv';

configDotenv();

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT ?? 1433);
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const WEB_URI = process.env.WEB_URI;
