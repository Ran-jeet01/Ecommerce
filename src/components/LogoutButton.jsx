import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center w-full text-left text-sm text-gray-700 hover:text-red-500 transition-colors duration-150 ${className}`}
    >
      <FiLogOut className="mr-3 text-gray-500" />
      Logout
    </button>
  );
};

export default LogoutButton;
