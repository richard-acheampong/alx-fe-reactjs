
import React from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { postId } = useParams();

  return (
    <div>
      <h2>Post #{postId}</h2>
      <p>
        This is a dynamic route. The <code>:postId</code> param comes from the URL (e.g., <code>/posts/42</code>).
      </p>
      <p>
        You can enhance this by fetching data for the given <code>postId</code> from an API.
      </p>
    </div>
  );
}
