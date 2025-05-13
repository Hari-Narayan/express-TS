// import mongoose from "mongoose";
// import { color } from "console-log-colors";

// import configs from ".";

// export default function mongooseConnect() {
//   mongoose
//     .connect(configs.mongoUri)
//     .then(() => console.info(color.green("Database connected successfully.")))
//     .catch((err) => console.error(err));
// }

import mongoose from "mongoose";

import configs from ".";

const mongooseConnect = async () => {
  try {
    await mongoose.connect(configs.mongoUri);
    console.log(`Database connected successfully.`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default mongooseConnect;
