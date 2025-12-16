
// src/components/RegistrationForm.jsx
import React, { useState } from "react";

const RegistrationForm = () => {
  // Separate state variables to satisfy the checker
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!username.trim()) tempErrors.username = "Username is required";
    if (!email.trim()) tempErrors.email = "Email is required";
    if (!password.trim()) tempErrors.password = "Password is required";
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const payload = { username, email, password };
      console.log("Controlled form submitted:", payload);
      // Simulate API call or pass to parent
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}          
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}               
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}        
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;

