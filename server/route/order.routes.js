import express from "express";
import { createOrder, getOrders, verifyPayment } from "../controller/order.controller.js";
 import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();
router.post("/create", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);
router.get("/", authMiddleware, getOrders);
export default router;
