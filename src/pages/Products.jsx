import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ category: "", size: "", color: "", ordering: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("categories/");
        setCategories(res.data);
      } catch (err) {
        console.log(err.response?.data || err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `products/?page=${page}`;
        if (filters.category) url += `&category=${filters.category}`;
        if (filters.size) url += `&size=${filters.size}`;
        if (filters.color) url += `&color=${filters.color}`;
        if (filters.ordering) url += `&ordering=${filters.ordering}`;

        const res = await API.get(url);
        setProducts(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 10)); // assuming page_size=10
      } catch (err) {
        console.log(err.response?.data || err);
      }
    };
    fetchProducts();
  }, [filters, page]);

  // Handle filter change
  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      await API.post("cart/add/", { product_id: productId, quantity: 1 });
      alert("Added to cart ✅");
    } catch (err) {
      alert("Please login to add to cart");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      {/* Filters */}
      <ProductFilter
        categories={categories}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {products.length === 0 && <p>No products found.</p>}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            buyNow={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            style={{
              padding: "5px 10px",
              marginRight: 5,
              backgroundColor: num === page ? "#4caf50" : "#f0fff4",
              color: num === page ? "white" : "black",
              border: "1px solid #ddd",
              borderRadius: 5,
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
