import moment from "moment";
import { genSaltSync, hashSync } from "bcryptjs";

import configs from "../configs";

export const setJson: any = {
  getters: true,
  transform: (_doc: any, ret: any) => {
    delete ret._id;
    delete ret.password;

    ret.createdAt = moment(ret.createdAt).format(configs.dateFormat);
    ret.updatedAt = moment(ret.updatedAt).format(configs.dateFormat);
  },
};

export function encryptPassword(password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  return hash;
}

export const createFileURL = (image: string, folder: string): string => {
  return image ? `${configs.baseUrl}/${folder}/${image}` : "";
};
