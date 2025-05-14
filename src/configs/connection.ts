import mongoose from "mongoose";
import { color } from "console-log-colors";

import configs from ".";
import { DB_CONNECTED } from "../lang/en/common";

const mongooseConnect = async () => {
  try {
    await mongoose.connect(configs.mongoUri);
    console.log(`\n${color.green(DB_CONNECTED)}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default mongooseConnect;
