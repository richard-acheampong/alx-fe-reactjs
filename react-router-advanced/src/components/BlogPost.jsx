
// src/components/BlogPost.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  return (
    <div>
      <h2>Blog Post #{id}</h2>
      <p>
        Dynamic route at <code>/blog/:id</code>. The <code>id</code> comes from the URL.
      </p>
    </div>
  );
}