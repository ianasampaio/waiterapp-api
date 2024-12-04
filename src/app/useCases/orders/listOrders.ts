import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function listOrders(req: Request, res: Response) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const orders = await Order.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    })
    .sort({ createdAt: 1})
    .populate('products.product');

    res.json(orders);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
}
