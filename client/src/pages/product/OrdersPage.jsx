import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/api";
import { getAccessToken } from "../../utils/token";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axiosInstance.get("/orders", { headers: { Authorization: `Bearer ${getAccessToken()}` } });
    setOrders(res.data);
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      {orders.length === 0 ? <p>No orders yet</p> : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="border p-4 mb-2">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Amount:</strong> ₹{order.amount}</p>
              <div>
                <strong>Items:</strong>
                <ul>
                  {order.items.map(i => <li key={i.product._id}>{i.product.name} x {i.quantity}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
