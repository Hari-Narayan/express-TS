import { Response } from "express";
import { SOMETHING_WENT_WRONG } from "../lang/en/common";

export interface IResponse {
  data?: any;
  code?: number;
  res: Response;
  message?: string;
  error?: any | null;
}

export default class ResponseHelper {
  static success({ res, message, data = {}, code = 200 }: IResponse): Response {
    return res.status(code).json({ success: true, message, data });
  }

  static error({
    res,
    code = 500,
    error = null,
    message = SOMETHING_WENT_WRONG,
  }: IResponse): Response {
    return res.status(code).json({ success: true, message, error });
  }
}
