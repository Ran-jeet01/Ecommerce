import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import LogoutButton from "./LogoutButton";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user name from Firestore
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

  // Watch cart items
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
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-blue-500 font-semibold"
        : "text-gray-700 hover:text-blue-500"
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? "text-blue-500 font-semibold"
        : "text-gray-700 hover:text-blue-500"
    }`;

  return (
    <nav className={`bg-white shadow-sm ${scrolled ? "py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-500 transition-colors duration-200"
            >
              TIME2<span className="text-blue-500">FLEX</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>

            <NavLink to="/products" className={navLinkClasses}>
              Products
            </NavLink>

            <NavLink to="/cart" className="relative flex items-center">
              <FiShoppingCart className="h-5 w-5 text-gray-700 hover:text-blue-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {userName ? userName.charAt(0).toUpperCase() : <FiUser />}
                  </div>
                  <span className="ml-2 text-sm text-gray-700">
                    {userName || currentUser.email.split("@")[0]}
                  </span>
                </div>
                <LogoutButton className="text-sm text-gray-700 hover:text-blue-500" />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink to="/login" className={navLinkClasses}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <NavLink to="/cart" className="relative mr-4">
              <FiShoppingCart className="h-5 w-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              {menuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={mobileNavLinkClasses}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={mobileNavLinkClasses}
              onClick={() => setMenuOpen(false)}
            >
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              <FiShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {currentUser ? (
              <>
                <div className="flex items-center px-3 py-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {userName ? userName.charAt(0).toUpperCase() : <FiUser />}
                  </div>
                  <span className="ml-2 text-gray-700">
                    {userName || currentUser.email}
                  </span>
                </div>
                <LogoutButton className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500" />
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={mobileNavLinkClasses}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-500 hover:bg-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
