import path from 'path';
import dotenv from 'dotenv';


const envFileName = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

const envPath = path.resolve(__dirname, '..', envFileName);

dotenv.config({ path: envPath });