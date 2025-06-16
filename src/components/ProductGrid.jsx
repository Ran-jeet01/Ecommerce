import ProductCard from "./ProductCard";

const ProductGrid = ({ products, loading, addToCart }) => {
  if (loading) {
    return <p className="text-center col-span-full">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center col-span-full">No products found.</p>;
  }

  return (
    <div className="py-12 px-5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.docId}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
