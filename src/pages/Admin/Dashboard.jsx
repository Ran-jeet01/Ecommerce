// src/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../components/AuthProvider";

const Dashboard = () => {
  const { userData } = useAuth();
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const productSnap = await getDocs(collection(db, "Product"));
      const orderSnap = await getDocs(collection(db, "orders"));
      setStats({
        users: usersSnap.size,
        products: productSnap.size,
        orders: orderSnap.size,
      });
    };
    fetchStats();
  }, []);

  if (userData?.role !== "admin") {
    return <p className="p-4 text-red-500">Access denied. Admins only.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl">{stats.users}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl">{stats.products}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl">{stats.orders}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
