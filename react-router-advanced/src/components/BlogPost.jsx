
// src/components/BlogPost.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div>
           <h2>Blog Post #{id}</h2>
      <p>
        This is a dynamic blog route at <code>/blog/:id</code>. The <code>id</code> comes from the URL.
      </p>
      <p>
        You can enhance this by fetching blog content for the given <code>id</code> from an API or local data source.
      </p>
    </div>
  );
}