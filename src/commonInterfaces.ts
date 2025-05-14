import { Request, Response } from "express";

import { IUser } from "./models/user";

export interface IRequest extends Request {
  user?: IUser;
}

export interface IResponse {
  data?: any;
  code?: number;
  res: Response;
  message?: string;
  error?: any | null;
}
