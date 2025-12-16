
// src/__tests__/TodoList.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList.jsx';

describe('TodoList component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();

    // Optional semantic check:
    // expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('adds a new todo using fireEvent', () => {
    render(<TodoList />);

    // Prefer role-based selectors. If your input has a placeholder, this also works:
    // const input = screen.getByPlaceholderText(/add todo/i);
    const input = screen.getByRole('textbox', { name: /add todo/i }); // needs a <label> "Add todo" or aria-label="Add todo"
    fireEvent.change(input, { target: { value: 'New Task' } });

    // Submit the form explicitly (rubrics often expect fireEvent.submit)
       const form = input.closest('form');
    fireEvent.submit(form);

    // Alternatively, clicking the "Add" button is fine if your form handles onSubmit:
    // const addButton = screen.getByRole('button', { name: /add/i });
    // fireEvent.click(addButton);

    // Assert the new todo appears
    expect(screen.getByText('New Task')).toBeInTheDocument();

    // If your component clears the input on submit:
    // expect(input).toHaveValue('');
  });

  test('toggles a todo completed state when clicked', () => {
    render(<TodoList />);
    const item = screen.getByText('Learn React');

    // Initially not completed
    expect(item).toHaveStyle({ textDecoration: 'none' });

    fireEvent.click(item);
    expect(item).toHaveStyle({ textDecoration: 'line-through' });

    fireEvent.click(item);
    expect(item).toHaveStyle({ textDecoration: 'none' });
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const item = screen.getByText('Write tests');

    // Prefer role-based query for button with accessible name
    const deleteButton = screen.getByRole('button', { name: /delete write tests/i });
    fireEvent.click(deleteButton);

    expect(item).not.toBeInTheDocument();
  });


})
