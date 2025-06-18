const ProductCard = ({ product, addToCart }) => {
  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;
  const discountedPrice = price * (1 + discount / 100);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all relative overflow-hidden">
      <img
        src={product.imageURL}
        alt={product.name}
        className="w-full h-48 object-cover hover:scale-105 transition-transform"
      />
      {discount > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded font-bold">
          {discount}% OFF
        </span>
      )}
      <div className="p-4">
        <div className="text-blue-500 text-xs uppercase font-semibold mb-1">
          {product.category}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {product.name}
        </h3>
        <div className="mb-2">
          <span className="text-red-500 font-bold">
            {/* ${discountedPrice.toFixed(2)} */}${price.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-gray-500 line-through ml-2 text-sm">
              {/* ${price.toFixed(2)} */}${discountedPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart(product.docId)}
          data-id={product.docId}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
