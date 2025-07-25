import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5001;

export const MONGODB_URI = process.env.MONGODB_URI;

export const NODE_ENV = process.env.NODE_ENV;

export const JWT_TOKEN = process.env.JWT_TOKEN;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
