import { Router } from "express";

import authRouter from "./authRoute";
import userRouter from "./userRoute";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);

export default rootRouter;
