import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home"; // Your Home page (with Hero)
import Products from "./pages/Products"; // Your Products page (fetching and showing products)

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* add more routes as needed */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
