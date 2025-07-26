import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../components/AuthProvider";

const ManageOrders = () => {
  const { userData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      setError("Failed to update order status. Please try again.");
    }
  };

  const formatPrice = (price) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
  };

  if (userData?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-red-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-red-800">
                Access Denied
              </h3>
              <p className="text-red-700">
                You don't have permission to access this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-4 text-lg font-medium text-gray-700">
            Loading orders...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-red-500 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-red-800">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Manage Orders</h2>
        </div>

        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No orders found
              </h3>
              <p className="mt-1 text-gray-500">
                There are currently no orders in the system.
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Order ID</TableHeader>
                  <TableHeader>User</TableHeader>
                  <TableHeader>Total</TableHeader>
                  <TableHeader>Location</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    onUpdateStatus={updateStatus}
                    formatPrice={formatPrice}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const TableHeader = ({ children }) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {children}
  </th>
);

const OrderRow = ({ order, onUpdateStatus, formatPrice }) => {
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <tr className="hover:bg-gray-50">
      <TableCell>
        <span className="font-mono text-sm text-gray-800">
          {order.id.substring(0, 8)}...
        </span>
      </TableCell>

      <TableCell>
        <span className="text-gray-700">{order.userEmail || "N/A"}</span>
      </TableCell>

      <TableCell>
        <span className="font-medium text-gray-800">
          {formatPrice(order.total)}
        </span>
      </TableCell>

      <TableCell>
        <span className="text-gray-700 text-sm">{order.location || "N/A"}</span>
      </TableCell>

      <TableCell>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusColor[order.status?.toLowerCase() || "pending"] ||
            "bg-gray-100 text-gray-800"
          }`}
        >
          {order.status?.toLowerCase() || "pending"}
        </span>
      </TableCell>

      <TableCell>
        <div className="flex space-x-2">
          {order.status?.toLowerCase() !== "shipped" && (
            <Button
              onClick={() => onUpdateStatus(order.id, "shipped")}
              color="blue"
              icon={
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            >
              Mark Shipped
            </Button>
          )}
          {order.status?.toLowerCase() !== "delivered" && (
            <Button
              onClick={() => onUpdateStatus(order.id, "delivered")}
              color="green"
              icon={
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              }
            >
              Mark Delivered
            </Button>
          )}
        </div>
      </TableCell>
    </tr>
  );
};

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap">{children}</td>
);

const Button = ({ children, onClick, color, icon }) => {
  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    indigo: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
    yellow: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    gray: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${colorClasses[color]} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150`}
    >
      {icon}
      {children}
    </button>
  );
};

export default ManageOrders;
