
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <p>Nested routes for Profile sections:</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </div>

      {/* Nested child routes render here */}
      <Outlet />
    </div>
  );
}