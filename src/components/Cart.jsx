import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const cartRef = collection(db, "users", user.uid, "cart");

    // Realtime listener
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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

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

  if (loading) return <p className="p-4">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={checkout}
            className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
          >
            Purchase All
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
