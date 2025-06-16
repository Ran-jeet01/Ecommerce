import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./src/firebase/firebase"; // Adjust this path if needed

const Time2Flex = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentCategory, setCurrentCategory] = useState("sunglasses");
  const [currentGender, setCurrentGender] = useState("all");
  const [cartItems, setCartItems] = useState(0);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Product")); // Capital P
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setProductList(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === "products") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const changeCategory = (category) => {
    setCurrentCategory(category);
    setCurrentGender("all");
  };

  const addToCart = (productId) => {
    setCartItems((prev) => prev + 1);
    const button = document.querySelector(`[data-id="${productId}"]`);
    if (button) {
      button.textContent = "Added!";
      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 1000);
    }
  };

  const getFilteredProducts = () => {
    let filtered = productList.filter((p) => p.category === currentCategory);
    if (currentGender !== "all") {
      filtered = filtered.filter((p) => p.gender === currentGender);
    }
    return filtered;
  };

  const renderProducts = () =>
    getFilteredProducts().map((product) => {
      const price = Number(product.price) || 0;
      const discount = Number(product.discount) || 0;
      const discountedPrice = price * (1 - discount / 100);

      return (
        <div
          key={product.docId}
          className="bg-white rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all relative overflow-hidden"
        >
          <img
            src={product.image}
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
                ${discountedPrice.toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="text-gray-500 line-through ml-2 text-sm">
                  ${price.toFixed(2)}
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
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gray-800 px-5 py-4 sticky top-0 z-50 shadow flex justify-between items-center">
        <a href="#" className="text-white text-2xl font-bold">
          TIME2<span className="text-blue-400">FLEX</span>
        </a>
        <div className="flex gap-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("home");
            }}
            className="text-white hover:text-blue-400"
          >
            Home
          </a>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("products");
            }}
            className="text-white hover:text-blue-400"
          >
            Products
          </a>
          <span className="text-white">Cart ({cartItems})</span>
        </div>
      </nav>

      {/* Hero */}
      {currentPage === "home" && (
        <section
          className="h-screen flex flex-col justify-center items-center text-white text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-5xl font-bold mb-6">FLEX IN STYLE</h1>
          <p className="text-xl mb-8">
            Discover premium fashion that matches your unique personality
          </p>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("products");
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-full font-semibold transition-all"
          >
            SHOP NOW
          </a>
        </section>
      )}

      {/* Products */}
      {currentPage === "products" && (
        <>
          {/* Category Tabs */}
          <div className="bg-gray-800 px-5 py-3 sticky top-16 z-40 shadow flex justify-center gap-4 overflow-x-auto">
            {["sunglasses", "watches", "shoes", "hoodies", "combo"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => changeCategory(category)}
                  className={`px-4 py-2 rounded-full text-white transition ${
                    currentCategory === category
                      ? "bg-blue-500"
                      : "bg-opacity-10 hover:bg-opacity-20"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Gender Tabs */}
          {currentCategory !== "combo" && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {["all", "male", "female", "unisex"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setCurrentGender(gender)}
                  className={`px-6 py-2 rounded-full border transition ${
                    currentGender === gender
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Product Grid */}
          <div className="py-12 px-5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <p className="text-center col-span-full">Loading products...</p>
            ) : getFilteredProducts().length > 0 ? (
              renderProducts()
            ) : (
              <p className="text-center col-span-full">No products found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Time2Flex;
