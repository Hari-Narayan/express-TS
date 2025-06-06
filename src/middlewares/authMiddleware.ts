import { verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";

import configs from "../configs";
import User from "../models/user";
import { UNAUTHORIZED } from "../lang/en/auth";
import { IRequest } from "../commonInterfaces";
import { USER_NOT_FOUND } from "../lang/en/user";
import ResponseHelper from "../helpers/responseHelper";

const auth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token = req.headers.authorization || "";
  token = token ? token.replace("Bearer ", "") : "";

  try {
    const { email = "" }: any = verify(token, configs.jwtSecret);
    const user = await User.findOne({ email });

    if (!user) {
      return ResponseHelper.error({
        res,
        code: 401,
        error: UNAUTHORIZED,
        message: USER_NOT_FOUND,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return ResponseHelper.error({
      res,
      error,
      code: 401,
      message: UNAUTHORIZED,
    });
  }
};

export default auth;
