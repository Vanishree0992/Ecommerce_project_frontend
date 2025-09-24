const ProductCard = ({ product, addToCart, buyNow }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#f0fff4",
      }}
    >
      <img
        src={`http://127.0.0.1:8000${product.image}`}
        alt={product.name}
        style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 5 }}
      />
      <h3>{product.name}</h3>
      <p>
        ${product.discount_price || product.price}{" "}
        {product.discount_price && (
          <span style={{ textDecoration: "line-through", color: "#888", marginLeft: 10 }}>
            ${product.price}
          </span>
        )}
      </p>
      <p>
        Size: {product.size} | Color: {product.color}
      </p>
      <button
        onClick={() => addToCart(product.id)}
        style={{
          marginRight: 5,
          backgroundColor: "#4caf50",
          color: "white",
          padding: "5px 10px",
          border: "none",
          borderRadius: 5,
        }}
      >
        Add to Cart
      </button>
      <button
        onClick={buyNow}
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "5px 10px",
          border: "none",
          borderRadius: 5,
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
