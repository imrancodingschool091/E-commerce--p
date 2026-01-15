import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../service/api";
import { getAccessToken } from "../../utils/token";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Review form */
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const token = getAccessToken();
  const isLoggedIn = !!token;

  /* 🔐 Auth Guard */
  const requireAuth = () => {
    if (!isLoggedIn) {
      toast.info("Please login to continue 🔐");
      navigate("/login");
      return false;
    }
    return true;
  };

  /* 🔹 Fetch product & reviews */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axiosInstance.get(`/products/${id}`);
        setProduct(productRes.data.product);

        const reviewRes = await axiosInstance.get(`/products/${id}/reviews`);
        setReviews(reviewRes.data.reviews || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* 🛒 Add to Cart */
  const handleAddToCart = async () => {
    if (!requireAuth()) return;

    try {
      await axiosInstance.post(
        "/cart",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product added to cart 🛒");
      navigate("/cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  /* ⚡ Buy Now */
  const handleBuyNow = async () => {
    if (!requireAuth()) return;

    await handleAddToCart();
    navigate("/checkout");
  };

  /* ⭐ Submit Review */
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!requireAuth()) return;

    try {
      const res = await axiosInstance.post(
        `/products/${id}/review`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews((prev) => [res.data.review, ...prev]);
      toast.success("Review added successfully ⭐");
      setComment("");
      setRating(5);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add review");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-semibold">
        Loading product...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-500">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-100 h-96 rounded flex items-center justify-center">
          <span className="text-gray-400">Product Image</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500 mt-3">{product.description}</p>

          <div className="mt-6 text-2xl font-bold text-blue-600">
            ₹{product.price}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="px-6 py-3 border rounded hover:bg-gray-100"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="border p-4 rounded bg-gray-50">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{r.user?.name || "User"}</h3>
                  <span className="text-yellow-500 font-bold">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add Review */}
        {isLoggedIn ? (
          <form
            onSubmit={handleReviewSubmit}
            className="mt-6 border p-4 rounded bg-gray-50 space-y-4"
          >
            <h3 className="text-xl font-semibold">Add Review</h3>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 rounded w-full"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
              className="border p-2 rounded w-full"
              placeholder="Write your review..."
            />

            <button className="px-6 py-3 bg-blue-600 text-white rounded">
              Submit Review
            </button>
          </form>
        ) : (
          <p className="mt-4 text-gray-500">
            Please{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              login
            </span>{" "}
            to add a review
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
