import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import config from "../config";
import User from "../models/user";
import mailer from "../helpers/mailer";
import { USER_NOT_FOUND } from "../lang/en/user";
import ResetPassword from "../models/resetPassword";
import ResponseHelper from "../helpers/responseHelper";
import { SOMETHING_WENT_WRONG } from "../lang/en/common";
import { generateToken, randomString } from "../helpers/common";
import {
  LOGIN_SUCCESS,
  RESET_LINK_SENT,
  PASSWORD_CHANGED,
  REGISTER_SUCCESS,
  INCORRECT_PASSWORD,
  RESET_LINK_EXPIRED,
  USER_ALREADY_EXIST,
} from "../lang/en/auth";

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    let user: any = await User.findOne({ email });

    if (!user)
      return ResponseHelper.error({
        res,
        code: 404,
        error: USER_NOT_FOUND,
        message: USER_NOT_FOUND,
      });

    if (!bcrypt.compareSync(password, user.password))
      return ResponseHelper.error({
        res,
        code: 400,
        error: INCORRECT_PASSWORD,
        message: INCORRECT_PASSWORD,
      });

    const token = generateToken(user.email);

    return ResponseHelper.success({
      res,
      message: LOGIN_SUCCESS,
      data: { ...user.toJSON(), token },
    });
  } catch (error) {
    console.error(error);

    return ResponseHelper.error({ res, error, message: SOMETHING_WENT_WRONG });
  }
};

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    let user: any = await User.findOne({ email: req.body.email });

    if (user)
      return ResponseHelper.error({
        res,
        code: 400,
        error: USER_ALREADY_EXIST,
        message: USER_ALREADY_EXIST,
      });

    user = await new User(req.body).save();

    const token = generateToken(user.email);

    return ResponseHelper.success({
      res,
      message: REGISTER_SUCCESS,
      data: { ...user.toJSON(), token },
    });
  } catch (error) {
    console.error(error);

    return ResponseHelper.error({
      res,
      error,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return ResponseHelper.error({
        res,
        code: 404,
        error: USER_NOT_FOUND,
        message: USER_NOT_FOUND,
      });

    await ResetPassword.findOneAndDelete({ email });

    let resetUser = await new ResetPassword({
      email,
      token: randomString(60),
      expiredAt: new Date().getTime() + 1000 * 60 * 60,
    }).save();

    await mailer({
      to: email,
      subject: "Reset Password",
      html: `<a href="${config.resetLink.replace(
        "token",
        resetUser.token
      )}" target="_blank">Click here to reset password</a>`,
    });

    return ResponseHelper.success({
      res,
      data: resetUser,
      message: RESET_LINK_SENT,
    });
  } catch (error) {
    console.error(error);

    return ResponseHelper.error({
      res,
      error,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    const resetPassword: any = await ResetPassword.findOne({ token });
    const { email, expiredAt } = resetPassword;
    const now = new Date().getTime();

    if (now > expiredAt)
      return ResponseHelper.error({
        res,
        code: 400,
        error: RESET_LINK_EXPIRED,
        message: RESET_LINK_EXPIRED,
      });

    if (newPassword !== confirmPassword)
      return ResponseHelper.error({
        res,
        code: 400,
        message: "Password & Confirm password does not match!",
      });

    await User.findOneAndUpdate(
      { email },
      { $set: { password: newPassword } },
      { new: true }
    );

    await ResetPassword.deleteOne({ token });

    return ResponseHelper.success({
      res,
      message: PASSWORD_CHANGED,
    });
  } catch (error) {
    return ResponseHelper.error({ res, error, message: SOMETHING_WENT_WRONG });
  }
};
