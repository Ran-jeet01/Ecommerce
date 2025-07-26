import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
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

  const addToCart = async (productId) => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login to add items to your cart.");
      return;
    }

    const cartRef = doc(db, "users", user.uid, "cart", productId);

    try {
      await setDoc(cartRef, {
        quantity: 1,
        addedAt: serverTimestamp(),
      });

      const button = document.querySelector(`[data-id="${productId}"]`);
      if (button) {
        button.textContent = "Added!";
        setTimeout(() => (button.textContent = "Add to Cart"), 1000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  return (
    <>
      {" "}
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
