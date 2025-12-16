
// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout({ children }) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <Navbar />
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(true);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          {/* Optional: simulate unmount/remount */}
          <button onClick={() => setReady((r) => !r)} style={{ marginBottom: 12 }}>
            {ready ? "Unmount Routes" : "Mount Routes"}
          </button>

          {ready ? (
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Dynamic route */}
              <Route path="/posts/:postId" element={<Post />} />

              {/* Protected + Nested */}
              <Route
                path="/profile/*"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              >
                {/* Nested routes inside /profile */}
                <Route index element={<ProfileDetails />} />
                <Route path="details" element={<ProfileDetails />} />
                <Route path="settings" element={<ProfileSettings />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <p>Routes unmounted.</p>
          )}
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
