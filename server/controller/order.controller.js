import Razorpay from "razorpay";
import crypto from "crypto";
import { Cart } from "../model/cart.model.js";
import { Order } from "../model/order.model.js";

import dotenv from "dotenv";
dotenv.config()
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * 🧾 Create Razorpay Order
 * POST /api/orders/create
 */
export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const amount =
      cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ) * 100; // Razorpay uses paise

    const options = {
      amount,
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = await Order.create({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      amount: amount / 100,
      orderId: razorpayOrder.id,
      status: "pending",
    });

    res.status(201).json({
      razorpayOrder,
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

/**
 * ✅ Verify Razorpay Payment
 * POST /api/orders/verify
 */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "paid";
    order.paymentId = razorpay_payment_id;
    await order.save();

    // clear user's cart after successful payment
    await Cart.findOneAndUpdate(
      { user: order.user },
      { items: [] }
    );

    res.status(200).json({ message: "Payment successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification error" });
  }
};

/**
 * 📦 Get logged-in user's orders
 * GET /api/orders
 */
export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
