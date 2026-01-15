import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // if you have auth
      required: true
    },
    name: {
      type: String, // user name snapshot
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },

    reviews: [reviewSchema],

    averageRating: {
      type: Number,
      default: 0
    },
    numReviews: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
