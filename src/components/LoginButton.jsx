// src/components/LoginButton.jsx
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const LoginButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return user ? (
    <div className="flex items-center gap-2 text-white">
      <img
        src={user.photoURL}
        alt="User"
        className="w-8 h-8 rounded-full"
        title={user.displayName}
      />
      <button
        onClick={handleLogout}
        className="hover:text-red-400 transition-colors"
      >
        Logout
      </button>
    </div>
  ) : (
    <button
      onClick={handleLogin}
      className="text-white hover:text-blue-400 transition-colors"
    >
      Login
    </button>
  );
};

export default LoginButton;
