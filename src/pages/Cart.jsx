import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);

  const fetchCart = async () => {
    try {
      const res = await API.get("cart/");
      setCartItems(res.data);
      setCartCount(res.data.length);
      setLoading(false);
    } catch (err) {
      console.log(err.response?.data || err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await API.put(`cart/update/${itemId}/`, { quantity });
      fetchCart();
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to update quantity.");
    }
  };

  const removeItem = async (itemId) => {
    try {
      await API.delete(`cart/remove/${itemId}/`);
      fetchCart();
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to remove item.");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.product.discount_price || item.product.price) * item.quantity,
    0
  );

  if (loading) return <p style={{ padding: 20 }}>Loading cart...</p>;
  if (!cartItems.length) return <p style={{ padding: 20 }}>Your cart is empty.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid #ddd",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
            backgroundColor: "#f9f9f9",
          }}
        >
          <img
            src={`https://e-commerce-project-backend-yssb.onrender.com${item.product.image}`}
            alt={item.product.name}
            style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 5 }}
          />
          <div style={{ flex: 1 }}>
            <h4>{item.product.name}</h4>
            <p>
              ${item.product.discount_price || item.product.price}{" "}
              {item.product.discount_price && (
                <span style={{ textDecoration: "line-through", color: "#888" }}>
                  ${item.product.price}
                </span>
              )}
            </p>
            <p>
              Quantity:{" "}
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>{" "}
              {item.quantity}{" "}
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </p>
            <button
              onClick={() => removeItem(item.id)}
              style={{ padding: "5px 10px", backgroundColor: "red", color: "white", border: "none", borderRadius: 5 }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 20 }}>
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        <button
          onClick={() => navigate("/checkout")}
          style={{ padding: 10, backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: 5 }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
