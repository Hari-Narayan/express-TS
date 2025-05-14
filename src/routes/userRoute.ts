import { Router } from "express";

import { updatePassword, list, myProfile } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/list", list);
userRouter.get("/my-profile", myProfile);
userRouter.put("/update-password", updatePassword);

export default userRouter;
