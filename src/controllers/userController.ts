import { Request, Response } from "express";

import User from "../models/user";
import ResponseHelper from "../helpers/responseHelper";
import { SOMETHING_WENT_WRONG } from "../lang/en/common";
import { USER_FOUND, USER_NOT_FOUND } from "../lang/en/user";

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
