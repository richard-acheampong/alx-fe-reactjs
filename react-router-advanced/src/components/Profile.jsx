

import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <p>Nested routes for Profile sections:</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </div>

      /* Local nested routing inside Profile component */
      <Routes>
        /* index route — when at /profile */
        <Route path="/" element={<ProfileDetails />} />
        {/* explicit sub-routes */}
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
