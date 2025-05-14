import dotenv from "dotenv";
import { expand } from "dotenv-expand";

expand(dotenv.config());

interface Config {
  port: number;
  expireTime: any;
  baseUrl: string;
  mongoUri: string;
  mailHost: string;
  mailUser: string;
  mailPort: number;
  urlPrefix: string;
  jwtSecret: string;
  resetLink: string;
  apiBaseUrl: string;
  dateFormat: string;
  mailSender: string;
  uploadPath: string;
  environment: string;
  mailPassword: string;
}

// Server config port & environment
const configs: Config = {
  expireTime: "24h",
  dateFormat: "DD MMM, YYYY HH:mm:ss",
  baseUrl: process.env.BASE_URL || "",
  mailHost: process.env.MAIL_HOST || "",
  mailUser: process.env.MAIL_USER || "",
  port: Number(process.env.PORT) || 4000,
  resetLink: process.env.RESET_URL || "",
  mongoUri: process.env.MONGODB_URI || "",
  mailSender: process.env.MAIL_SENDER || "",
  apiBaseUrl: process.env.API_BASE_URL || "",
  urlPrefix: process.env.URL_PREFIX || "/api",
  mailPassword: process.env.MAIL_PASSWORD || "",
  mailPort: Number(process.env.MAIL_PORT) || 465,
  jwtSecret: process.env.JWT_SECRET || "jwt_secret",
  environment: process.env.NODE_ENV || "development",
  uploadPath: process.env.UPLOAD_PATH || "/public/uploads/",
};

export default configs;
