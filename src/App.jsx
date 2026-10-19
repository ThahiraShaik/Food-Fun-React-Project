import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Cart from "./Cart";
import Tiffins from "./Tiffins";
import Signup from "./Signup";
import Login from "./Login";
import Juice from "./Juice";
import Aboutus from "./Aboutus";

function App() {
  const cartItems = useSelector((state) => state.cart);
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.Quantity,
    0
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (name = "User") => {
    setIsLoggedIn(true);
    setUsername(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "15px",
          background: "#222",
          padding: "10px 20px",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Left Side - Navigation Links */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "22px", fontWeight: "bold" }}>
            🍴 FoodFun
          </span>

          <Link to="/" style={linkStyle}>
            🏠 Home
          </Link>

          <Link to="/Tiffins" style={linkStyle}>
            🍛 Tiffins
          </Link>

          <Link to="/veg" style={linkStyle}>
            🥬 Veg
          </Link>

          <Link to="/nonveg" style={linkStyle}>
            🍗 Nonveg
          </Link>

          <Link to="/juice" style={linkStyle}>
            🥤 Juice
          </Link>

          <Link to="/aboutus" style={linkStyle}>
            ℹ️ About Us
          </Link>
        </div>

        {/* Right Side - Cart and Authentication */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/cart"
            style={{ ...linkStyle, position: "relative" }}
          >
            🛒 Cart

            {totalQuantity > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-15px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "3px 8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {totalQuantity}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                style={authButtonStyle("#f39c12")}
              >
                🔑 Signup
              </Link>

              <Link
                to="/login"
                style={authButtonStyle("#3498db")}
              >
                🔓 Login
              </Link>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  color: "#2ecc71",
                }}
              >
                👋 Welcome, {username}
              </span>

              <button
                onClick={handleLogout}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Page Routes */}
      <Routes>
        {/* Open Home page by default */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/Tiffins" element={<Tiffins />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Nonveg />} />
        <Route path="/juice" element={<Juice />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Redirect unknown URLs to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  position: "relative",
};

const authButtonStyle = (background) => ({
  background,
  color: "white",
  padding: "6px 12px",
  borderRadius: "6px",
  fontWeight: "bold",
  textDecoration: "none",
});

export default App;
