import { join } from "path";
import { color } from "console-log-colors";

import app from "./app";
import config from "./config";
import mongooseConnect from "./config/connection";
import { extractRoutePaths } from "./helpers/common";

mongooseConnect();

app.listen(config.port, () => {
  console.info(`\nServer running on ${color.blue(`${config.baseUrl}/`)}`);
  console.info(`API Base URL: ${color.blue(`${config.apiBaseUrl}/`)}`);

  const filePath = join(__dirname, "routes/index.ts");
  extractRoutePaths(filePath, config.apiBaseUrl);
});
