import express, { json } from "express";

import config from "./config";
import rootRouter from "./routes";
// import { errorHandler } from "./middlewares/auth";

const app = express();

app.use(json());

// Routes
app.use(config.urlPrefix, rootRouter);

// // Global error handler (should be after routes)
// app.use(errorHandler);

export default app;
