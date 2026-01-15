import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    { product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, quantity: Number }
  ],
  amount: { type: Number, required: true },
  paymentId: String,
  orderId: String,
  status: { type: String, default: "pending" }, // pending, paid
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
