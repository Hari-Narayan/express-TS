import { Router } from "express";

import authRouter from "./authRoute";
import userRouter from "./userRoute";
import auth from "../middlewares/authMiddleware";
// Importing the routers

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", auth, userRouter);
// Define the routes

export default rootRouter;
