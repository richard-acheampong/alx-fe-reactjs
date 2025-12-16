
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/profile";

  const handleLogin = () => {
    login();
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>Login</h2>
      {isAuthenticated ? (
        <p>
          You are already logged in. Go to{" "}
          <button onClick={() => navigate("/profile")}>Profile</button>
        </p>
      ) : (
        <>
          <p>You must log in to access protected pages.</p>
          <button onClick={handleLogin}>Log In</button>
        </>
      )}
    </div>
  );
}
