import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "#2196f3",
      color: "white",
      padding: "20px",
      marginTop: "40px",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap"
    }}>
      <div style={{ marginBottom: 10 }}>
        <h3>MyShop</h3>
        <p>Your one-stop online shop for fashion & accessories.</p>
      </div>

      <div style={{ marginBottom: 10 }}>
        <h4>Quick Links</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
          <li><Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link></li>
          <li><Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link></li>
          <li><Link to="/track-order" style={{ color: "white", textDecoration: "none" }}>Track Orders</Link></li>
        </ul>
      </div>

      <div style={{ marginBottom: 10 }}>
        <h4>Contact Us</h4>
        <p>Email: support@myshop.com</p>
        <p>Phone: +1 234 567 890</p>
      </div>

      <div style={{ width: "100%", textAlign: "center", marginTop: 10 }}>
        <small>© {new Date().getFullYear()} MyShop. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
