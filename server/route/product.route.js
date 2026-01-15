import express from "express";
import { addProductReview, createProduct, getPrdocuts, getProductById, getProductReviews, searchProduct } from "../controller/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router=express.Router();

router.post("/",createProduct);
router.get("/",getPrdocuts);
router.get("/search",searchProduct);
router.get("/:id",getProductById)
router.post("/:id/review", authMiddleware, addProductReview);
router.get("/:id/reviews", getProductReviews);


export default router