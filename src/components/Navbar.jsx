import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import LogoutButton from "./LogoutButton";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState(""); // ✅ Add user name state

  // ✅ Fetch user name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      if (!currentUser) {
        setUserName("");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserName(userSnap.data().name || "");
      } else {
        setUserName("");
      }
    };

    fetchUserName();
  }, [currentUser]);

  // ✅ Watch cart items
  useEffect(() => {
    if (!currentUser) {
      setCartCount(0);
      return;
    }

    const cartRef = collection(db, "users", currentUser.uid, "cart");

    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const count = snapshot.docs.reduce(
        (sum, doc) => sum + (doc.data().quantity || 1),
        0
      );
      setCartCount(count);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const navLinkClasses = ({ isActive }) =>
    `text-white hover:text-blue-400 ${
      isActive ? "text-blue-400 font-extrabold" : ""
    }`;

  return (
    <nav className="bg-gray-800 px-5 py-4 sticky top-0 z-50 shadow">
      <div className="flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold">
          TIME2<span className="text-blue-400">FLEX</span>
        </NavLink>

        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClasses}>
            Products
          </NavLink>
          <NavLink to="/cart" className={navLinkClasses}>
            Cart ({cartCount})
          </NavLink>

          {currentUser ? (
            <>
              <span className="text-white font-semibold">
                {userName || currentUser.email}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClasses}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClasses}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col md:hidden mt-2 gap-4">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClasses}>
            Products
          </NavLink>
          <NavLink to="/cart" className={navLinkClasses}>
            Cart ({cartCount})
          </NavLink>

          {currentUser ? (
            <>
              <span className="text-white">
                {userName || currentUser.email}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClasses}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClasses}>
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
