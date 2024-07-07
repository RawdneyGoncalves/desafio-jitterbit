import { Request, Response } from "express";
import OrderService from "../services/orderService";

class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const order = await OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getOrder(req: Request, res: Response) {
    try {
      const order = await OrderService.getOrder(req.params.orderId);
      res.status(200).json(order);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  static async listOrders(req: Request, res: Response) {
    try {
      const orders = await OrderService.listOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async updateOrder(req: Request, res: Response) {
    try {
      const order = await OrderService.updateOrder(req.params.orderId, req.body);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async deleteOrder(req: Request, res: Response) {
    try {
      await OrderService.deleteOrder(req.params.orderId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default OrderController;
