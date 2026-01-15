import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import authRoutes from "./route/auth.route.js"
import productRoutes from "./route/product.route.js"
import cartRoutes from "./route/cart.routes.js"
import orderRoutes from "./route/order.routes.js"
dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors(
    {
        origin:"https://e-commerce-p-seven.vercel.app",
        credentials:true
    }
));


connectDb()


//

app.use("/auth",authRoutes);
app.use("/products",productRoutes)
app.use("/cart",cartRoutes)
app.use("/orders",orderRoutes)

const port=process.env.PORT||8080
app.listen(port,()=>{
    console.log(`The App Is Running On Port${port}`)
})
