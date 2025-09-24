const ProductFilter = ({ categories, filters, handleFilterChange }) => {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <select
        value={filters.category}
        onChange={(e) => handleFilterChange("category", e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select value={filters.size} onChange={(e) => handleFilterChange("size", e.target.value)}>
        <option value="">All Sizes</option>
        {["XS", "S", "M", "L", "XL"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select value={filters.color} onChange={(e) => handleFilterChange("color", e.target.value)}>
        <option value="">All Colors</option>
        {["Red", "Blue", "Green", "Yellow", "Black", "White"].map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={filters.ordering}
        onChange={(e) => handleFilterChange("ordering", e.target.value)}
      >
        <option value="">Default</option>
        <option value="price">Price: Low → High</option>
        <option value="-price">Price: High → Low</option>
        <option value="rating">Rating: Low → High</option>
        <option value="-rating">Rating: High → Low</option>
      </select>
    </div>
  );
};

export default ProductFilter;
