import express from "express";
import { getMe, login, logout, refreshAccessToken, register } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/refresh",refreshAccessToken);
router.post("/logout",logout)
router.get("/me", authMiddleware, getMe)


export default router