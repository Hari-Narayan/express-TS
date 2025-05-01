import { Router } from "express";

import { list } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/list", list);

export default userRouter;
