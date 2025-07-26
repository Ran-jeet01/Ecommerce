// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";

// Public Pages
import Home from "./pages/Home";
import Products from "./pages/Products";

// Auth Pages
import Login from "./components/Login";
import Register from "./components/Register";

// Components
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageOrders from "./pages/Admin/ManageOrders";
import ManageUsers from "./pages/Admin/ManageUsers"; 

// User Pages
import UpdateProfile from "./pages/UpdateProfile";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect /admin to /admin/dashboard */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="admin">
              <ManageProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <ManageOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<p className="p-4">404 - Page Not Found</p>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
