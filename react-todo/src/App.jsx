
import React from "react";
import TodoList from "./components/TodoList.jsx";

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>React Todo App</h1>
      <TodoList />
    </div>
  );
}
