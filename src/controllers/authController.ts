import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import configs from "../configs";
import User from "../models/user";
import mailer from "../helpers/mailHelper";
import { USER_NOT_FOUND } from "../lang/en/user";
import CommonHelper from "../helpers/commonHelper";
import ResetPassword from "../models/resetPassword";
import ResponseHelper from "../helpers/responseHelper";
import { SOMETHING_WENT_WRONG } from "../lang/en/common";
import {
  LOGIN_SUCCESS,
  RESET_LINK_SENT,
  PASSWORD_CHANGED,
  REGISTER_SUCCESS,
  INCORRECT_PASSWORD,
  RESET_LINK_EXPIRED,
  USER_ALREADY_EXIST,
} from "../lang/en/auth";
import MailHelper from "../helpers/mailHelper";

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    let user: any = await User.findOne({ email });

    if (!user) {
      return ResponseHelper.error({
        res,
        code: 404,
        message: USER_NOT_FOUND,
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return ResponseHelper.error({
        res,
        code: 400,
        message: INCORRECT_PASSWORD,
      });
    }

    const token = CommonHelper.generateToken(user.email);

    return ResponseHelper.success({
      res,
      message: LOGIN_SUCCESS,
      data: { ...user.toJSON(), token },
    });
  } catch (error) {
    return ResponseHelper.error({ res, error, message: SOMETHING_WENT_WRONG });
  }
};

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    let user: any = await User.findOne({ email: req.body.email });

    if (user) {
      return ResponseHelper.error({
        res,
        code: 400,
        message: USER_ALREADY_EXIST,
      });
    }

    user = await new User(req.body).save();
    const token = CommonHelper.generateToken(user.email);

    return ResponseHelper.success({
      res,
      message: REGISTER_SUCCESS,
      data: { ...user.toJSON(), token },
    });
  } catch (error) {
    return ResponseHelper.error({ res, error });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return ResponseHelper.error({
        res,
        code: 404,
        message: USER_NOT_FOUND,
      });
    }

    await ResetPassword.findOneAndDelete({ email });

    let resetUser = await new ResetPassword({
      email,
      token: CommonHelper.randomString(60),
      expiredAt: new Date().getTime() + 1000 * 60 * 60,
    }).save();

    await MailHelper.mailer({
      to: email,
      subject: "Reset Password",
      html: `<a href="${configs.resetLink.replace(
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
    return ResponseHelper.error({ res, error });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token, newPassword } = req.body;
    const resetPassword: any = await ResetPassword.findOne({ token });
    const { email, expiredAt } = resetPassword;
    const now = new Date().getTime();

    if (now > expiredAt) {
      return ResponseHelper.error({
        res,
        code: 400,
        message: RESET_LINK_EXPIRED,
      });
    }

    await User.findOneAndUpdate(
      { email },
      { $set: { password: newPassword } },
      { new: true }
    );

    await ResetPassword.deleteOne({ token });

    return ResponseHelper.success({ res, message: PASSWORD_CHANGED });
  } catch (error) {
    return ResponseHelper.error({ res, error });
  }
};
