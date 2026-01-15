import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/api"
import { getAccessToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const res = await axiosInstance.get("/cart", { headers: { Authorization: `Bearer ${getAccessToken()}` } });
    setCart(res.data.items);
  };

  useEffect(() => { fetchCart(); }, []);

  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const removeItem = async (id) => {
    await axiosInstance.delete(`/cart/${id}`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
    fetchCart();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between border p-2 mb-2">
              <div>{item.product.name}</div>
              <div>₹{item.product.price} x {item.quantity}</div>
              <button onClick={() => removeItem(item._id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <div className="text-right font-bold mt-4">Total: ₹{total}</div>
          <button onClick={() => navigate("/checkout")} className="mt-4 px-6 py-3 bg-green-600 text-white rounded">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}
