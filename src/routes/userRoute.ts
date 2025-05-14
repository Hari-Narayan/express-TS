import { Router } from "express";

import {
  list,
  myProfile,
  uploadImage,
  updatePassword,
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/list", list);
userRouter.get("/my-profile", myProfile);
userRouter.post("/upload-image", uploadImage);
userRouter.put("/update-password", updatePassword);

export default userRouter;
