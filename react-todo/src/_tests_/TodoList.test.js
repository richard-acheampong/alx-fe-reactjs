
// src/__tests__/TodoList.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList.jsx";

describe("TodoList component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Build Todo App")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add todo");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("toggles a todo completed state when clicked", () => {
    render(<TodoList />);
    const item = screen.getByText("Learn React");

    // initially not completed
    expect(item).toHaveStyle({ textDecoration: "none" });

    // toggle to completed
    fireEvent.click(item);
    expect(item).toHaveStyle({ textDecoration: "line-through" });

    // toggle back to not completed
    fireEvent.click(item);
    expect(item).toHaveStyle({ textDecoration: "none" });
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const item = screen.getByText("Write tests");
    const deleteButton = screen.getByLabelText("Delete Write tests");

    fireEvent.click(deleteButton);

    expect(item).not.toBeInTheDocument();
  });
});
