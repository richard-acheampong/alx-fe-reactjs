
import React, { useState } from "react";

export default function AddTodoForm({ onAdd }) {
   const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} aria-label="add-todo-form">
      <input
        placeholder="Add todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}