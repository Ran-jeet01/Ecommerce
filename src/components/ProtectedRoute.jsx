// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children, role }) => {
  const { currentUser, loading } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!currentUser) {
        setCheckingRole(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        setUserRole(userData.role || "user");
      } catch (error) {
        console.error("Failed to fetch role:", error);
      } finally {
        setCheckingRole(false);
      }
    };

    fetchRole();
  }, [currentUser]);

  if (loading || checkingRole) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
