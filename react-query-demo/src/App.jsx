
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./components/PostsComponent";

// React Query client instance (v3)
const queryClient = new QueryClient();

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
        <h1>React Query Demo (v3) — JSONPlaceholder Posts</h1>

        {/* Toggle to unmount/remount and observe caching on remount */}
        <button
          onClick={() => setShowPosts((prev) => !prev)}
          style={{ marginBottom: 12 }}
        >
          {showPosts ? "Hide Posts" : "Show Posts"}
        </button>

        {showPosts ? <PostsComponent /> : <p>PostsComponent is unmounted.</p>}
           </div>
    </QueryClientProvider>
  );
}

