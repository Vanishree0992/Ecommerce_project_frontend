import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await API.get("cart/");
      setCartItems(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await API.post("cart/add/", { product_id: productId, quantity });
      fetchCart();
    } catch (err) {
      alert("Please login to add to cart");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await API.delete(`cart/remove/${itemId}/`);
      fetchCart();
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
