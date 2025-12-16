
// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 16px",
        borderBottom: "1px solid #ddd",
        alignItems: "center",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/posts/1">Post #1</Link>
      <Link to="/profile">Profile</Link>

           <span style={{ marginLeft: "auto", fontSize: 12 }}>
        Auth: {isAuthenticated ? "Yes" : "No"}
      </span>

      {isAuthenticated && (
        <button onClick={logout} style={{ marginLeft: 8 }}>
          Logout
        </button>
      )}
    </nav>
  );
}