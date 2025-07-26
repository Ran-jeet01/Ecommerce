import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "orders"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(
        fetchedOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-xl font-semibold">
          Please login to view your orders.
        </h2>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading)
    return <p className="text-center mt-6">Loading your orders...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center bg-white p-6 rounded shadow">
          <p className="text-gray-600">You haven’t placed any orders yet.</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-600">
                    Order ID: <span className="font-mono">{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                  {order.delivered && (
                    <p className="text-xs text-green-600 mt-1">Delivered ✅</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-3 space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t pt-3 flex justify-between text-sm">
                <p className="text-gray-500">Delivery Location:</p>
                <p className="text-right">{order.location}</p>
              </div>

              <div className="mt-2 text-right font-bold">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
