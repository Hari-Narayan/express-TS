import { Response } from "express";

import { IResponse } from "../commonInterfaces";
import { SOMETHING_WENT_WRONG } from "../lang/en/common";

export default class ResponseHelper {
  static success({ res, message, data = {}, code = 200 }: IResponse): Response {
    return res.status(code).json({ success: true, message, data });
  }

  static error({
    res,
    code = 500,
    error = null,
    message = "",
  }: IResponse): Response {
    message = message || error?.message || SOMETHING_WENT_WRONG;

    return res.status(code).json({ success: false, message, error });
  }
}
