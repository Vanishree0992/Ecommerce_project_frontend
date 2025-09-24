import { useEffect, useState } from "react";
import API from "../api/axios";

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("order/track/");
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err.response?.data || err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading orders...</p>;
  if (!orders.length) return <p style={{ padding: 20 }}>You have no orders yet.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ddd", padding: 15, borderRadius: 5, marginBottom: 15, backgroundColor: "#f9f9f9" }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
          <p><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
          <div>
            <strong>Products:</strong>
            <ul>
              {order.products.map((item) => (
                <li key={item.id}>
                  {item.product.name} x {item.quantity} (${(item.product.discount_price || item.product.price).toFixed(2)} each)
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackOrder;
