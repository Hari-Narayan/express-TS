import { compare } from "bcryptjs";
import { Request, Response } from "express";

import User from "../models/user";
import { IRequest } from "../commonInterfaces";
import ResponseHelper from "../helpers/responseHelper";
import { SOMETHING_WENT_WRONG } from "../lang/en/common";
import { USER_FOUND, USER_NOT_FOUND } from "../lang/en/user";
import { INCORRECT_PASSWORD, PASSWORD_CHANGED } from "../lang/en/auth";

export async function myProfile(req: IRequest, res: Response): Promise<any> {
  try {
    return ResponseHelper.success({
      res,
      data: req.user,
      message: USER_FOUND,
    });
  } catch (error: any) {
    return ResponseHelper.error({
      res,
      error,
    });
  }
}

export async function updatePassword(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return ResponseHelper.error({
        res,
        code: 404,
        error: USER_NOT_FOUND,
        message: USER_NOT_FOUND,
      });
    }

    const isPassMatched = await compare(password, user.password.toString());

    if (!isPassMatched) {
      return ResponseHelper.error({
        res,
        code: 400,
        error: INCORRECT_PASSWORD,
        message: INCORRECT_PASSWORD,
      });
    }

    await User.findOneAndUpdate(
      { _id: user.id },
      { $set: { password: newPassword } },
      { new: true }
    );

    return ResponseHelper.success({
      res,
      message: PASSWORD_CHANGED,
    });
  } catch (error) {
    return ResponseHelper.error({
      res,
      error,
    });
  }
}

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
    console.error(error);

    return ResponseHelper.error({ res, error, message: SOMETHING_WENT_WRONG });
  }
};
