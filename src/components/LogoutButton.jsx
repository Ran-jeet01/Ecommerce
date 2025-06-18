import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const LogoutButton = () => {
  const navigate = useNavigate(); // ✅ hook

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // ✅ redirect to login (or "/register")
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
