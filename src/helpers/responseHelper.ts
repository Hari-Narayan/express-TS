import { Response } from "express";

export interface IResponse {
  data?: any;
  code?: number;
  res: Response;
  message: string;
  error?: any | null;
}

export default class ResponseHelper {
  static success({ res, message, data = {}, code = 200 }: IResponse): Response {
    return res.status(code).json({ success: true, message, data });
  }

  static error({
    res,
    message,
    code = 500,
    error = null,
  }: IResponse): Response {
    return res.status(code).json({ success: true, message, error });
  }
}
