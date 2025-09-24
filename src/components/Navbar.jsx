import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ backgroundColor: "#2196f3", padding: "10px 20px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <Link to="/" style={{ color: "white", fontWeight: "bold", fontSize: 20, textDecoration: "none" }}>
          MyShop
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>Home</NavLink>
        <NavLink to="/products" style={{ color: "white", textDecoration: "none" }}>Products</NavLink>
        <NavLink to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</NavLink>
        {user ? (
          <>
            <NavLink to="/track-order" style={{ color: "white", textDecoration: "none" }}>My Orders</NavLink>
            <button onClick={handleLogout} style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "5px 10px", borderRadius: 5, cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" style={{ color: "white", textDecoration: "none" }}>Login</NavLink>
            <NavLink to="/register" style={{ color: "white", textDecoration: "none" }}>Register</NavLink>
          </>
        )}
        <NavLink to="/cart" style={{ color: "white", textDecoration: "none", position: "relative" }}>
          Cart
          {cartItems.length > 0 && (
            <span style={{
              position: "absolute",
              top: -5,
              right: -10,
              backgroundColor: "red",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: 12
            }}>
              {cartItems.length}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
