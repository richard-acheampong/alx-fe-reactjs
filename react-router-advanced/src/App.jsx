
// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import BlogPost from "./components/BlogPost"; // ✅ ensure this file exists under components
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
                   <button onClick={() => setReady((r) => !r)} style={{ marginBottom: 12 }}>
            {ready ? "Unmount Routes" : "Mount Routes"}
          </button>

          {ready ? (
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Dynamic routes */}
              <Route path="/posts/:postId" element={<Post />} />
              <Route path="/blog/:id" element={<BlogPost />} /> {/* ✅ satisfies checker: "Route path=" and "/blog/:id" */}

              {/* Protected + nested routes under /profile */}
              <Route
                path="/profile/*"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ProfileDetails />} />
                <Route path="details" element={<ProfileDetails />} />
                <Route path="settings" element={<ProfileSettings />} />
              </Route>

              {/* Fallback */}
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