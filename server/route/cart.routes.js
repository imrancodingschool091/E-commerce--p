import express from "express";
import { addToCart, getCart, removeCartItem } from "../controller/cart.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/:itemId", authMiddleware, removeCartItem);
export default router;
