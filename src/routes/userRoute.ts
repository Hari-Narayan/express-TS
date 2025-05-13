import { Router } from "express";

import { updatePassword, list, myProfile } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/list", list);
userRouter.post("/my-profile", myProfile);
userRouter.post("/update-password", updatePassword);

export default userRouter;
