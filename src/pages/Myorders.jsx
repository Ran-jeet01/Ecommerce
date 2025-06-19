// import { useState, useEffect } from "react";
// import { useAuth } from "../components/AuthProvider";
// import { db } from "../firebase/firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   orderBy,
//   doc,
//   getDoc,
// } from "firebase/firestore";

// const MyOrders = () => {
//   const { currentUser } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!currentUser) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // Option 1: Check both locations for orders
//         const results = await Promise.allSettled([
//           // 1. Check main orders collection
//           getDocs(
//             query(
//               collection(db, "orders"),
//               where("userId", "==", currentUser.uid),
//               orderBy("createdAt", "desc")
//             )
//           ),
//           // 2. Check user's order history
//           getDoc(doc(db, "users", currentUser.uid)).then((userSnap) =>
//             userSnap.exists() ? userSnap.data().orders || [] : []
//           ),
//         ]);

//         // Combine results from both queries
//         const [ordersResult, userHistoryResult] = results;

//         let ordersData = [];

//         // Process main orders collection
//         if (ordersResult.status === "fulfilled") {
//           ordersData = ordersResult.value.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//             date: doc.data().createdAt ? new Date(doc.data().createdAt) : null,
//           }));
//         }

//         // Fallback to user history if no orders found
//         if (
//           ordersData.length === 0 &&
//           userHistoryResult.status === "fulfilled"
//         ) {
//           ordersData = userHistoryResult.value.map((order) => ({
//             ...order,
//             date: order.date ? new Date(order.date) : null,
//           }));
//         }

//         setOrders(ordersData);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to load orders:", err);
//         setError("Failed to load orders. Please refresh or try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [currentUser]);

//   // Render states
//   if (!currentUser) {
//     return (
//       <div className="max-w-3xl mx-auto p-4 text-center">
//         <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//         <p className="text-gray-600">Please sign in to view your orders</p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="max-w-3xl mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//         <p className="text-gray-600">Loading your orders...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-3xl mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//         <div className="text-red-500 bg-red-50 p-3 rounded mb-4">{error}</div>
//         <button
//           onClick={() => window.location.reload()}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">My Orders</h2>

//       {orders.length === 0 ? (
//         <div className="bg-gray-50 p-6 rounded text-center">
//           <p className="text-gray-600 mb-4">No orders found</p>
//           <button
//             onClick={() => navigate("/products")}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Browse Products
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <OrderCard key={order.id} order={order} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const OrderCard = ({ order }) => (
//   <div className="border rounded-lg overflow-hidden shadow-sm">
//     <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
//       <div>
//         <h3 className="font-semibold">
//           Order #{order.id?.substring(0, 8) || "N/A"}
//         </h3>
//         <p className="text-sm text-gray-500">
//           {order.date?.toLocaleDateString() || "Unknown date"}
//         </p>
//       </div>
//       <StatusBadge status={order.status} delivered={order.delivered} />
//     </div>

//     <div className="p-4">
//       <OrderItems items={order.items} />
//       <div className="mt-4 pt-4 border-t flex justify-between items-center">
//         <p className="font-medium">
//           Total: ${order.total?.toFixed(2) || "0.00"}
//         </p>
//         {order.location && (
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Location:</span> {order.location}
//           </p>
//         )}
//       </div>
//     </div>
//   </div>
// );

// const StatusBadge = ({ status, delivered }) => {
//   let bgColor = "bg-gray-100";
//   let textColor = "text-gray-800";
//   let statusText = status || "Processing";

//   if (delivered) {
//     bgColor = "bg-green-100";
//     textColor = "text-green-800";
//     statusText = "Delivered";
//   } else if (status === "cancelled") {
//     bgColor = "bg-red-100";
//     textColor = "text-red-800";
//   } else if (status === "shipped") {
//     bgColor = "bg-blue-100";
//     textColor = "text-blue-800";
//   }

//   return (
//     <span className={`text-xs px-3 py-1 rounded-full ${bgColor} ${textColor}`}>
//       {statusText}
//     </span>
//   );
// };

// const OrderItems = ({ items }) => (
//   <div>
//     <h4 className="font-medium mb-2">Items</h4>
//     <ul className="space-y-2">
//       {items?.map((item, index) => (
//         <li key={index} className="flex items-start">
//           {item.imageURL && (
//             <img
//               src={item.imageURL}
//               alt={item.name}
//               className="w-12 h-12 object-cover rounded mr-3"
//             />
//           )}
//           <div>
//             <p className="font-medium">{item.name}</p>
//             <p className="text-sm text-gray-600">
//               {item.quantity} × ${item.price?.toFixed(2)} = $
//               {(item.quantity * item.price)?.toFixed(2)}
//             </p>
//           </div>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// export default MyOrders;

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
