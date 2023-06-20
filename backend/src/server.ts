import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { sample_products, sample_users } from "./data";
import jwt from "jsonwebtoken";
import productRouter from "./routers/product.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./config/db.config";
import orderRouter from "./routers/order.router";
dbConnect();

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
