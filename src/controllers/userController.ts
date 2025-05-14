import { compare } from "bcryptjs";
import { Request, Response } from "express";

import User from "../models/user";
import { IRequest } from "../commonInterfaces";
import ResponseHelper from "../helpers/responseHelper";
import { SOMETHING_WENT_WRONG } from "../lang/en/common";
import FileUploadHelper from "../helpers/fileUploadHelper";
import { INCORRECT_PASSWORD, PASSWORD_CHANGED } from "../lang/en/auth";
import { IMAGE_UPLOADED, USER_FOUND, USER_NOT_FOUND } from "../lang/en/user";

export async function myProfile(req: IRequest, res: Response): Promise<any> {
  try {
    return ResponseHelper.success({ res, data: req.user, message: USER_FOUND });
  } catch (error: any) {
    return ResponseHelper.error({ res, error });
  }
}

export async function updatePassword(
  req: IRequest,
  res: Response
): Promise<any> {
  try {
    const { password, newPassword }: any = req.body;
    const { _id, password: oldPassword }: any = req.user;
    const isPassMatched = await compare(password, oldPassword.toString());

    if (!isPassMatched) {
      return ResponseHelper.error({
        res,
        code: 400,
        error: INCORRECT_PASSWORD,
        message: INCORRECT_PASSWORD,
      });
    }

    await User.updateOne(
      { _id: _id.toString() },
      { $set: { password: newPassword } }
    );

    return ResponseHelper.success({ res, message: PASSWORD_CHANGED });
  } catch (error) {
    return ResponseHelper.error({ res, error });
  }
}

export const uploadImage = async (
  req: IRequest,
  res: Response
): Promise<any> => {
  try {
    const { _id }: any = req.user;

    FileUploadHelper.singleFileUpload(req, "profileImage", "users");

    const { profileImage } = req.body;
    const { profileImage: oldProfileImage }: any = req.user;

    FileUploadHelper.removeSingleFile(oldProfileImage);

    const user = await User.findByIdAndUpdate(
      { _id },
      { $set: { profileImage } },
      { new: true }
    );

    return ResponseHelper.success({ res, data: user, message: IMAGE_UPLOADED });
  } catch (error: any) {
    return ResponseHelper.error({ res, error });
  }
};

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const users: any[] = await User.find();

    if (users.length === 0) {
      return ResponseHelper.error({
        res,
        code: 404,
        error: USER_NOT_FOUND,
        message: USER_NOT_FOUND,
      });
    }

    return ResponseHelper.success({ res, data: users, message: USER_FOUND });
  } catch (error) {
    return ResponseHelper.error({ res, error, message: SOMETHING_WENT_WRONG });
  }
};
