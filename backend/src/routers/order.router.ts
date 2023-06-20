import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import auth from "../middlewares/auth.mid";

const router = Router();
router.use(auth);

router.post(
  "/create",
  asyncHandler(async (req: any, res: any) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send("Cart Is Empty!");
      return;
    }

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.get(
  "/ordersForCurrentUser",
  asyncHandler(async (req: any, res) => {
    const orders = await getOrdersForCurrentUser(req);
    if (orders) res.send(orders);
    else res.status(HTTP_BAD_REQUEST).send();
  })
);

router.get(
  "/track/:id",
  asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: any, res) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(HTTP_BAD_REQUEST).send("Order not found");
    }
  })
);

export default router;

async function getOrdersForCurrentUser(req: any) {
  return await OrderModel.find({
    user: req.user.id,
  });
}
