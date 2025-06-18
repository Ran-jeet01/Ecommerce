import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const MyOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      try {
        const ordersRef = collection(db, "users", currentUser.uid, "orders");
        const snapshot = await getDocs(ordersRef);
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Order ID: {order.id}</h3>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    order.delivered
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {order.delivered ? "Delivered" : "Pending"}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                Date:{" "}
                {order.date ? new Date(order.date).toLocaleString() : "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Total: ${order.total?.toFixed(2) || "0.00"}
              </p>

              <div className="text-sm text-gray-700">
                <h4 className="font-semibold mb-1">Items:</h4>
                <ul className="list-disc ml-5">
                  {order.items?.map((item, index) => (
                    <li key={index}>
                      {item.name} — {item.quantity} × ${item.price}
                    </li>
                  ))}
                </ul>
              </div>

              {order.location && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Delivery Location:</strong> {order.location}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
