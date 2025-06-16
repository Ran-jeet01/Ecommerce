import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import CategoryTabs from "../components/CategoryTabs";
import GenderTabs from "../components/GenderTabs";
import ProductGrid from "../components/ProductGrid";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("sunglasses");
  const [currentGender, setCurrentGender] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Product"));
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

  const filteredProducts = productList.filter(
    (p) =>
      p.category === currentCategory &&
      (currentGender === "all" || p.gender === currentGender)
  );

  const addToCart = (id) => {
    const button = document.querySelector(`[data-id="${id}"]`);
    if (button) {
      button.textContent = "Added!";
      setTimeout(() => (button.textContent = "Add to Cart"), 1000);
    }
  };

  return (
    <>
      <CategoryTabs
        currentCategory={currentCategory}
        changeCategory={setCurrentCategory}
      />
      {currentCategory !== "combo" && (
        <GenderTabs
          currentGender={currentGender}
          setCurrentGender={setCurrentGender}
        />
      )}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        addToCart={addToCart}
      />
    </>
  );
};

export default Products;
