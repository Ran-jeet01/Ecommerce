import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import LogoutButton from "./LogoutButton";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiSettings,
  FiPackage,
  FiLogOut,
} from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!currentUser) {
        setUserName("");
        setUserRole("");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserName(userData.name || "");
        setUserRole(userData.role || "user");
      } else {
        setUserName("");
        setUserRole("");
      }
    };

    fetchUserInfo();
  }, [currentUser]);

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
    <nav
      className={`bg-white shadow-sm ${
        scrolled ? "py-2" : "py-4"
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-500"
          >
            TIME2<span className="text-blue-500">FLEX</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClasses}>
              Products
            </NavLink>

            {currentUser && userRole === "admin" && (
              <NavLink to="/admin" className={navLinkClasses}>
                Admin Panel
              </NavLink>
            )}

            <NavLink to="/cart" className="relative flex items-center">
              <FiShoppingCart className="h-5 w-5 text-gray-700 hover:text-blue-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-semibold shadow-sm">
                    {userName ? (
                      userName.charAt(0).toUpperCase()
                    ) : (
                      <FiUser className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
                    {userName || currentUser.email.split("@")[0]}
                  </span>
                  <FaChevronDown
                    className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <>
                    {/* Click outside to close dropdown */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {userName || currentUser.email.split("@")[0]}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>

                      <NavLink
                        to="/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiSettings className="mr-3 text-gray-500" />
                        Update Profile
                      </NavLink>

                      <NavLink
                        to="/my-orders"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiPackage className="mr-3 text-gray-500" />
                        My Orders
                      </NavLink>

                      <div className="border-t border-gray-100">
                        <LogoutButton
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150 focus:outline-none"
                          icon={<FiLogOut className="mr-3 text-gray-500" />}
                        />
                        {/* Inside your Navbar component's dropdown section */}
                        {/* <div className="border-t border-gray-100">
                          <LogoutButton className="px-4 py-3 hover:bg-blue-50" />
                        </div> */}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClasses}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
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

            {currentUser && userRole === "admin" && (
              <NavLink
                to="/admin"
                className={mobileNavLinkClasses}
                onClick={() => setMenuOpen(false)}
              >
                Admin Panel
              </NavLink>
            )}

            {currentUser && (
              <>
                <NavLink
                  to="/profile"
                  className={mobileNavLinkClasses}
                  onClick={() => setMenuOpen(false)}
                >
                  Update Profile
                </NavLink>
                <NavLink
                  to="/my-orders"
                  className={mobileNavLinkClasses}
                  onClick={() => setMenuOpen(false)}
                >
                  My Orders
                </NavLink>
              </>
            )}

            {!currentUser ? (
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
            ) : (
              <LogoutButton className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-500" />
              // <div className="border-t border-gray-100">
              //   <LogoutButton className="px-4 py-3 hover:bg-blue-50" />
              // </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
