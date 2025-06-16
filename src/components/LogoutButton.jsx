// src/components/LogoutButton.jsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
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
