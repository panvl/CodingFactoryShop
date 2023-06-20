import { Router } from "express";
import { sample_products } from "../data";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const productCount = await ProductModel.countDocuments();
    if (productCount > 0) {
      res.send("Seed is already done");
      return;
    }
    await ProductModel.create(sample_products);
    res.send("Seed is done");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.send(products);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { color: { $regex: searchRegex } },
      ],
    });
    res.send(products);
  })
);

router.get(
  "/:productId",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.findById(req.params.productId);
    res.send(products);
  })
);

export default router;
