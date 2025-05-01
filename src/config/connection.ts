import mongoose from "mongoose";
import { color } from "console-log-colors";

import config from ".";
// import { default as mongoose } from "mongoose";

export default function mongooseConnect() {
  mongoose
    .connect(config.mongoUri)
    .then(() => console.info(color.green("Database connected successfully.")))
    .catch((err) => console.error(err));
}
