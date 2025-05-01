import { Document, Schema, model } from 'mongoose';

import { setJson } from '../helpers/modelHelper';

export interface ResetPasswordInterface extends Document {
  id?: string;
  _id: string;
  email: string;
  token: string;
  expiredAt: number;
}

const schema = new Schema(
  {
    email: { type: String, required: true, trim: true },
    token: { type: String, required: true },
    expiredAt: { type: Number, required: true },
  },
  {
    toJSON: setJson,
    timestamps: false,
    versionKey: false,
  },
);

const ResetPassword = model<ResetPasswordInterface>('reset-password', schema);

export default ResetPassword;
