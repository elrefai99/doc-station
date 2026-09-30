import dotenv from "dotenv";
import path from 'node:path'

const envPath = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';

export default dotenv.config({
     path: path.resolve(process.cwd(), envPath)
})
