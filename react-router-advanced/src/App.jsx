
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
import BlogPost from "./components/BlogPost"; // ✅ NEW
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

