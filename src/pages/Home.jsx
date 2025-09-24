import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get("products/?page=1");
        setFeatured(res.data.results.slice(0, 6)); // show first 6 products as featured
      } catch (err) {
        console.log(err.response?.data || err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Welcome to Our Store</h2>
      <h3>Featured Products</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {featured.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 5 }}
            />
            <h4>{product.name}</h4>
            <p>
              ${product.discount_price || product.price}{" "}
              {product.discount_price && (
                <span style={{ textDecoration: "line-through", color: "#888", marginLeft: 5 }}>
                  ${product.price}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
