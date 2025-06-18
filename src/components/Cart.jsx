import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const user = auth.currentUser;
  const navigate = useNavigate();

  // Format price safely
  const formatPrice = (price) => {
    const num = Number(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  // Format total safely
  const formatTotal = (price, quantity) => {
    const priceNum = Number(price) || 0;
    const quantityNum = Number(quantity) || 0;
    return (priceNum * quantityNum).toFixed(2);
  };

  const updateQuantity = async (id, newQty) => {
    if (newQty < 1) return;
    const itemRef = doc(db, "users", user.uid, "cart", id);
    await updateDoc(itemRef, { quantity: newQty });
  };

  const deleteItem = async (id) => {
    const itemRef = doc(db, "users", user.uid, "cart", id);
    await deleteDoc(itemRef);
  };

  const checkout = async () => {
    if (cartItems.length === 0) return;
    alert("Purchase successful! Clearing cart...");
    for (const item of cartItems) {
      await deleteItem(item.id);
    }
  };

  useEffect(() => {
    if (!user) return;

    const cartRef = collection(db, "users", user.uid, "cart");

    const unsubscribe = onSnapshot(cartRef, async (snapshot) => {
      const items = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const productId = docSnap.id;
          const data = docSnap.data();

          const productRef = doc(db, "Product", productId);
          const productSnap = await getDoc(productRef);

          return {
            id: productId,
            ...data,
            product: productSnap.exists() ? productSnap.data() : {},
          };
        })
      );
      setCartItems(items);

      // Calculate total with proper number conversion
      const calculatedTotal = items.reduce((sum, item) => {
        const price = Number(item.product.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return sum + price * quantity;
      }, 0);
      setTotal(calculatedTotal);

      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-12 text-center bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Please log in to view your cart.
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) return <p className="p-4 text-center">Loading cart...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">🛒</span>
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center p-4 border-b last:border-b-0"
              >
                {/* Product Info */}
                <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                  <div className="w-16 h-16 bg-gray-200 rounded mr-4 overflow-hidden">
                    {item.product.imageURL && (
                      <img
                        src={item.product.imageURL}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">
                      ${formatPrice(item.product.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between w-full sm:w-auto">
                  <div className="flex items-center mr-4 sm:mr-6">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-l transition"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="bg-gray-100 px-4 py-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-r transition"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      ${formatTotal(item.product.price, item.quantity)}
                    </p>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-600 hover:text-red-800 mt-1 transition"
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary and Checkout */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Total</h3>
              <p className="text-xl font-bold">${formatPrice(total)}</p>
            </div>
            <button
              onClick={checkout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
            >
              <span className="mr-2">🛒</span>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
