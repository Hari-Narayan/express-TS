import { Router } from "express";

import authRouter from "./authRoute";
import userRouter from "./userRoute";
import auth from "../middlewares/authMiddleware";
/* ====== Import routes end ===== */

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", auth, userRouter);
/* ====== Define routes end ===== */

export default rootRouter;
