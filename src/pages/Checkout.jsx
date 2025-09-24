import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);

  const fetchCart = async () => {
    try {
      const res = await API.get("cart/");
      setCartItems(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err.response?.data || err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.product.discount_price || item.product.price) * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (!shippingAddress.trim()) {
      alert("Please enter shipping address");
      return;
    }
    try {
      const res = await API.post("order/create/", {
        shipping_address: shippingAddress,
      });
      alert("Order placed successfully ✅");
      setCartCount(0);
      navigate(`/order-success/${res.data.id}`);
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to place order.");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading checkout...</p>;
  if (!cartItems.length) return <p style={{ padding: 20 }}>Your cart is empty.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>
      <div style={{ display: "flex", gap: 20 }}>
        {/* Cart Summary */}
        <div style={{ flex: 1 }}>
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              {item.product.name} x {item.quantity} - $
              {((item.product.discount_price || item.product.price) * item.quantity).toFixed(2)}
            </div>
          ))}
          <h4>Subtotal: ${subtotal.toFixed(2)}</h4>
        </div>

        {/* Shipping Form */}
        <div style={{ flex: 1 }}>
          <h3>Shipping Address</h3>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows={5}
            style={{ width: "100%", padding: 8, borderRadius: 5, border: "1px solid #ddd" }}
            placeholder="Enter your shipping address"
          />
          <button
            onClick={handleOrder}
            style={{ marginTop: 10, padding: 10, backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: 5 }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
