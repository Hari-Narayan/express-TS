import mongoose from "mongoose";

import { setJson } from "../helpers/modelHelper";

export interface IProduct {
  _id: string;
  name: string;
  price: string;
  stock: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  description: string;
}

const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: String },
    stock: { type: String },
    description: { type: String },
    deletedAt: { type: Date, default: null },
  },
  {
    toJSON: setJson,
    timestamps: true,
    versionKey: false,
  },
);

const Product = mongoose.model<IProduct>("Product", schema);

export default Product;
