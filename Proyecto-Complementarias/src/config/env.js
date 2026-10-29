import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    
    // Seguridad y JWT
    JWT_SECRET: process.env.JWT_SECRET || "default_super_secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",

    // Control de Bloqueos Login
    MAX_LOGIN_ATTEMPTS: parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5,
    LOCK_TIME_MINUTES: parseInt(process.env.LOCK_TIME_MINUTES) || 2,

    // Google Drive
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_DRIVE_ROOT_FOLDER_ID: process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID,

    // Email
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    EMAIL_PORT: parseInt(process.env.EMAIL_PORT) || 587,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
};