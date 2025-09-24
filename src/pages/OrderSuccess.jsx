import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`order/${id}/`);
        setOrder(res.data);
      } catch (err) {
        console.log(err.response?.data || err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p style={{ padding: 20 }}>Loading order details...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Placed Successfully ✅</h2>
      <p>Order ID: {order.id}</p>
      <p>Status: {order.status}</p>
      <p>Shipping Address: {order.shipping_address}</p>
      <h3>Products:</h3>
      <ul>
        {order.products.map((item) => (
          <li key={item.id}>
            {item.product.name} x {item.quantity} (${(item.product.discount_price || item.product.price).toFixed(2)} each)
          </li>
        ))}
      </ul>
      <p><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
      <Link to="/products">
        <button style={{ padding: "10px 15px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: 5 }}>
          Continue Shopping
        </button>
      </Link>
      <Link to="/track-order" style={{ marginLeft: 10 }}>
        <button style={{ padding: "10px 15px", backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: 5 }}>
          Track My Orders
        </button>
      </Link>
    </div>
  );
};

export default OrderSuccess;
