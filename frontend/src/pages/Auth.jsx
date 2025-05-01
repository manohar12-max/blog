import React, { useState } from "react";
import api from "../../api/api"; // Import the central api config file
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toggleAuth = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { username, email, password } = formData;

    try {
      const response = isSignIn
        ? await api.post("/auth/login", { email, password }) // For SignIn, only send email & password
        : await api.post("/auth/signup", { username: username, email, password }); // For SignUp, send username, email & password

      localStorage.setItem("userToken", JSON.stringify(response.data.token));

      setFormData({ username: "", email: "", password: "" });
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong.");
      console.error("Authentication error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
        <form className="auth-form" onSubmit={onSubmit}>
          {!isSignIn && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
          />
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
          {error && <p className="error-text">{error}</p>}
          <p className="toggle-text">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <span onClick={toggleAuth}>
              {isSignIn ? " Sign Up" : " Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
