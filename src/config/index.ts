import dotenv from "dotenv";
import { expand } from "dotenv-expand";

expand(dotenv.config());

interface Config {
  port: number;
  nodeEnv: string;
  baseUrl: string;
  mongoUri: string;
  urlPrefix: string;
  jwtSecret: string;
  resetLink: string;
  apiBaseUrl: string;
  dateFormat: string;
}

// Server config port & environment
const config: Config = {
  dateFormat: "DD MMM, YYYY HH:mm:ss",
  baseUrl: process.env.BASE_URL || "",
  port: Number(process.env.PORT) || 4000,
  resetLink: process.env.RESET_URL || "",
  mongoUri: process.env.MONGODB_URI || "",
  apiBaseUrl: process.env.API_BASE_URL || "",
  urlPrefix: process.env.URL_PREFIX || "/api",
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "jwt_secret",
};

export default config;
