import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.log(err.response?.data || err);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await API.post("cart/add/", { product_id: product.id, quantity });
      alert("Added to cart ✅");
    } catch (err) {
      alert("Please login to add to cart");
    }
  };

  if (!product) return <p style={{ padding: 20 }}>Loading product...</p>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          padding: "5px 10px",
          border: "1px solid #ddd",
          borderRadius: 5,
        }}
      >
        ← Back
      </button>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* Product Image */}
        <img
          src={`https://e-commerce-project-backend-yssb.onrender.com${product.image}`}
          alt={product.name}
          style={{ width: 300, height: 300, objectFit: "cover", borderRadius: 10 }}
        />

        {/* Product Info */}
        <div style={{ maxWidth: 500 }}>
          <h2>{product.name}</h2>
          <p style={{ fontSize: 18, fontWeight: "bold" }}>
            ${product.discount_price || product.price}{" "}
            {product.discount_price && (
              <span style={{ textDecoration: "line-through", color: "#888", marginLeft: 10 }}>
                ${product.price}
              </span>
            )}
          </p>

          <p>{product.description}</p>
          <p>
            <strong>Size:</strong> {product.size} | <strong>Color:</strong> {product.color}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <div style={{ display: "flex", alignItems: "center", marginTop: 10, gap: 10 }}>
            <label>Quantity:</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: 60, padding: 5, borderRadius: 5, border: "1px solid #ddd" }}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <button
              onClick={addToCart}
              style={{
                marginRight: 10,
                backgroundColor: "#4caf50",
                color: "white",
                padding: "8px 15px",
                border: "none",
                borderRadius: 5,
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              style={{
                backgroundColor: "#2e7d32",
                color: "white",
                padding: "8px 15px",
                border: "none",
                borderRadius: 5,
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
