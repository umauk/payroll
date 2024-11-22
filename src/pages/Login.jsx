import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { EmployeeContext, useEmployeeContext } from "../context/EmployeeContext";

function Login() {
  const {islogin,setIsLogin}=useContext(EmployeeContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === "admin" && email === "admin@example.com" && password === "password") {
      setError("");
      navigate("/dashboard");
      setIsLogin(true) 
    } else if (userType === "employee" && email === "employee@example.com" && password === "password") {
      setError(""); 
      navigate("/Payroll"); 
      setIsLogin(true) 
    } else {
      setError("Invalid credentials. Please try again."); 
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-form">
          <h2>Login</h2>
          <div className="user-type-selection">
            <label className={`user-card ${userType === "admin" ? "active" : ""}`}>
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={userType === "admin"}
                onChange={(e) => setUserType(e.target.value)}
              />
              <div className="card-content">
                <h3>Admin</h3>
                <p>Manage the platform and employees.</p>
              </div>
            </label>
            <label className={`user-card ${userType === "employee" ? "active" : ""}`}>
              <input
                type="radio"
                name="userType"
                value="employee"
                checked={userType === "employee"}
                onChange={(e) => setUserType(e.target.value)}
              />
              <div className="card-content">
                <h3>Employee</h3>
                <p>Access tasks and profile details.</p>
              </div>
            </label>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>} 
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
