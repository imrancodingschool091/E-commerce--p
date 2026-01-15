import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/api";
import { getAccessToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

/* ✅ Razorpay Script Loader */
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const token = getAccessToken();

  /* ✅ Fetch Cart */
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  /* ✅ Handle Razorpay Payment */
  const handlePayment = async () => {
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/orders/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { razorpayOrder } = res.data;

      const options = {
        key: "rzp_test_S3nlmYhAXj38mR",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,

        handler: async (response) => {
          await axiosInstance.post(
            "/orders/verify",
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Payment Successful 🎉");
          navigate("/orders");
        },

        prefill: {
          name: "Customer",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between border-b pb-2">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>₹{item.product.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-lg font-semibold">
        Total Amount: ₹{totalAmount}
      </p>

      <button
        onClick={handlePayment}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Pay with Razorpay
      </button>
    </div>
  );
}
