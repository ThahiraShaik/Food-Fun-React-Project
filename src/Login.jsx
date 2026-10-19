import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const getStoredUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.username) newErrors.username = true;
    if (!form.password) newErrors.password = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const users = getStoredUsers();

    const matchedUser = users.find(
      (u) => u.username === form.username && u.password === form.password
    );

    if (!matchedUser) {
      setMessage("❌ Account not found or incorrect password.");
      return;
    }

    setUser(matchedUser);
    setMessage("✅ Login successful!");
    setForm({ username: "", password: "" });
  };

  const handleLogout = () => {
    setUser(null);
    setMessage("🔒 You have been logged out.");
  };

  const isError =
    message.includes("not found") ||
    message.includes("wrong") ||
    message.includes("❌");

  return (
    <div className="signup-container">
      {!user ? (
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            className={errors.username ? "error-input" : ""}
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            className={errors.password ? "error-input" : ""}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Log In</button>

          {message && (
            <div
              className={`message-box ${isError ? "error-text" : "success-message"}`}
            >
              <span>{message}</span>
            </div>
          )}

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Don’t have an account?{" "}
            <span
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3>Welcome, {user.username}!</h3>
          <button
            style={{
              padding: "10px 20px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
