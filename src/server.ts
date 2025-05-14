import cors from "cors";
import { join } from "path";
import express from "express";
import { readFileSync } from "fs";
import { color } from "console-log-colors";

import configs from "./configs";
import rootRouter from "./routes";
import CommonHelper from "./helpers/commonHelper";
import mongooseConnect from "./configs/connection";
import expressFileUpload from "express-fileupload";

const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(expressFileUpload({ createParentPath: true }));
  app.use(express.static(join(__dirname, "../", configs.uploadPath)));

  const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));

  try {
    // Wait for MongoDB connection
    await mongooseConnect();

    app.get("/", (req, res) => {
      res.send(`Welcome to the ${packageJson.name} API!`);
    });

    app.use(configs.urlPrefix, rootRouter);

    app.listen(configs.port, () => {
      console.info(`\nServer running on ${color.blue(`${configs.baseUrl}/`)}`);
      console.info(`API Base URL ${color.blue(configs.apiBaseUrl)}\n`);

      CommonHelper.displayRoutes(packageJson, rootRouter);
    });
  } catch (error: any) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
