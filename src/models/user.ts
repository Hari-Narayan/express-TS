import { Schema, model } from "mongoose";

import { encryptPassword, setJson } from "../helpers/modelHelper";

export interface IUser {
  _id: string;
  email: string;
  token?: string;
  fullName: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  },
  {
    toJSON: setJson,
    timestamps: true,
    versionKey: false,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
