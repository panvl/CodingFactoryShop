import { Schema, model } from "mongoose";

export interface Product {
  id: string;
  name: string;
  tags: string[];
  color: string;
  description: string;
  price: number;
  imageurl: string;
}

export const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    tags: { type: [String] },
    color: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageurl: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const ProductModel = model<Product>("product", ProductSchema);
