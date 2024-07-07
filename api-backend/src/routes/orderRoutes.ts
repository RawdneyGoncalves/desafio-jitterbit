import { Router } from "express";
import OrderController from "../controllers/orderController";

const router = Router();

router.post("/", OrderController.createOrder);
router.get("/:orderId", OrderController.getOrder);
router.get("/list", OrderController.listOrders);
router.put("/:orderId", OrderController.updateOrder);
router.delete("/:orderId", OrderController.deleteOrder);

export default router;