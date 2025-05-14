import { Schema, model } from "mongoose";

import {
  setJson,
  createFileURL,
  encryptPassword,
} from "../helpers/modelHelper";

export interface IUser {
  _id: String;
  email: String;
  token?: String;
  fullName: String;
  password: String;
  createdAt?: Date;
  updatedAt?: Date;
  profileImage: String;
}

const userSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: false,
      set: encryptPassword,
    },
    profileImage: {
      type: String,
      required: false,
      get: (value: string) => createFileURL(value, "users"),
    },
  },
  {
    toJSON: setJson,
    timestamps: true,
    versionKey: false,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
