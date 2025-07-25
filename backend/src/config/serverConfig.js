import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5001;

export const MONGODB_URI = process.env.MONGODB_URI;

export const NODE_ENV = process.env.NODE_ENV;

export const JWT_TOKEN = process.env.JWT_TOKEN;
