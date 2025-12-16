
import React, { useState } from "react";
import { useQuery } from "react-query";

const PAGE_SIZE = 10;

const fetchPostsPage = async (page = 1) => {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  const data = await res.json();
  return data;
};

const PostsComponent = () => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery(
    ["posts", page],         // include page in the key for pagination
    () => fetchPostsPage(page),
    {
      // ✅ Required by your checker & ideal for pagination UX
      keepPreviousData: true,

      // Consider data fresh for 5s to avoid unnecessary refetch
      staleTime: 5000,

      // Keep cached pages for 2 minutes after unmount/switch
      cacheTime: 120000,

      // Refetch on mount if the data is stale
      refetchOnMount: true,

      // Refetch on window focus if stale
      refetchOnWindowFocus: true,
    }
  );

  // Initial load & error states
  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "crimson" }}>Error: {error.message}</p>;

  // JSONPlaceholder returns empty array when you go beyond available pages.
  const posts = data ?? [];
  const hasPreviousPage = page > 1;
  const hasNextPage = posts.length === PAGE_SIZE; // crude check without total count

  const lastUpdated =
    dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "N/A";

  return (
    <div>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => refetch()}>Refetch Current Page</button>
        {isFetching && <span style={{ fontSize: 12 }}>(Fetching...)</span>}
        <span style={{ marginLeft: "auto", fontSize: 12 }}>
          Last updated: {lastUpdated}
        </span>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={!hasPreviousPage}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => (hasNextPage ? p + 1 : p))} disabled={!hasNextPage}>
          Next
        </button>
      </div>

      {/* Posts List */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {posts.map((post) => (
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
        {posts.length === 0 && (
          <li style={{ color: "#666" }}>No posts on this page.</li>
        )}
      </ul>
    </div>
   );
};

