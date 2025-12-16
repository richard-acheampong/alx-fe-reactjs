
import React from "react";
import { useQuery } from "react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
};

const PostsComponent = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery(
    ["posts"],       // query key
    fetchPosts,      // query function
    {
      // Data is "fresh" for 5 seconds: avoids refetch during this window
      staleTime: 5000,

      // Keep cached data for 2 minutes after component unmount
      cacheTime: 120000,

      // Refetch on mount if data is stale (good UX for freshness)
      refetchOnMount: true,

      // Refetch when window regains focus (if stale)
      refetchOnWindowFocus: true,
    }
  );

  // Loading & error states
  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "crimson" }}>Error: {error.message}</p>;

  const lastUpdated =
    dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "N/A";

  return (
    <div>
      {/* Toolbar: manual refetch + status */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <button onClick={() => refetch()}>Refetch Posts</button>
        {isFetching && <span style={{ fontSize: 12 }}>(Fetching...)</span>}
        <span style={{ marginLeft: "auto", fontSize: 12 }}>
          Last updated: {lastUpdated}
        </span>
      </div>

      {/* Render a subset for brevity */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {data.slice(0, 10).map((post) => (
          <li
            key={post.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginBottom: 10,
            }}
          >
            <strong style={{ display: "block", marginBottom: 6 }}>
              {post.id}. {post.title}
                       </strong>
            <p style={{ margin: 0 }}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

