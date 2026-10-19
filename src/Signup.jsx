import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Auto-hide messages
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

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = true;
    if (!form.email) newErrors.email = true;
    if (!form.password) newErrors.password = true;
    if (!form.confirmPassword) newErrors.confirmPassword = true;
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const getStoredUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = getStoredUsers();

    const userExists = users.find((u) => u.username === form.username);
    if (userExists) {
      setMessage("❌ Username already exists.");
      return;
    }

    users.push({
      username: form.username,
      email: form.email,
      password: form.password,
    });

    saveUsers(users);
    setMessage("🎉 Account created! Redirecting to login...");
    setForm({ username: "", email: "", password: "", confirmPassword: "" });

    setTimeout(() => navigate("/login"), 2000); // redirect to login
  };

  const isError =
    message.includes("exists") ||
    message.includes("wrong") ||
    message.includes("❌");

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          className={errors.username ? "error-input" : ""}
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          className={errors.email ? "error-input" : ""}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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

        <input
          className={errors.confirmPassword ? "error-input" : ""}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {errors.confirmPassword === "Passwords do not match" && (
          <p className="error-text">Passwords do not match</p>
        )}

        <button type="submit">Sign Up</button>

        {message && (
          <div
            className={`message-box ${isError ? "error-text" : "success-message"}`}
          >
            <span>{message}</span>
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
