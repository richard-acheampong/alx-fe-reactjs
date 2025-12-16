
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Welcome. Try navigating to a{" "}
        <Link to="/posts/42">dynamic post</Link> or the protected{" "}
        <Link to="/profile">Profile</Link> page.
      </p>
    </div>
  );
}
