import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const MONGO_URI = process.env.MONGO_URI
export const NEWS_API_KEY = process.env.NEWS_API_KEY
export const LOCAL_MODEL = process.env.LOCAL_MODEL