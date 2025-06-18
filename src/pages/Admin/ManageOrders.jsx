import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collectionGroup, getDocs, updateDoc } from "firebase/firestore";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collectionGroup(db, "orders"));

    const allOrders = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const ref = docSnap.ref;
      const userId = ref.path.split("/")[1]; // Extract userId from path: "users/{userId}/orders/{orderId}"
      return {
        id: docSnap.id,
        ref,
        userId,
        ...data,
      };
    });

    setOrders(allOrders);
  };

  const toggleDeliveryStatus = async (ref, currentStatus) => {
    await updateDoc(ref, { delivered: !currentStatus });
    fetchOrders(); // refresh
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-lg shadow bg-white"
            >
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>User ID:</strong> {order.userId}
              </p>
              <p>
                <strong>Total:</strong> ${order.total?.toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
              <p>
                <strong>Location:</strong> {order.location}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {order.delivered ? (
                  <span className="text-green-600">Delivered ✅</span>
                ) : (
                  <span className="text-red-600">Not Delivered ❌</span>
                )}
              </p>
              <ul className="mt-2 ml-4 list-disc text-sm">
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.name} — {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-3 px-4 py-1 rounded text-white ${
                  order.delivered ? "bg-red-600" : "bg-green-600"
                }`}
                onClick={() => toggleDeliveryStatus(order.ref, order.delivered)}
              >
                {order.delivered ? "Mark as Undelivered" : "Mark as Delivered"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
