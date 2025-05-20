/// <reference types="vitest" />
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import TodoList from '../Todos/List';

describe('TodoList component', () => {
  const todos = [
    { text: 'Test me', done: false },
    { text: 'Already done', done: true }
  ];

  const deleteTodo = vi.fn();
  const completeTodo = vi.fn();

  test('renders all todos with correct status', () => {
    render(<TodoList todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

    expect(screen.getByText(/Test me/)).toBeInTheDocument();
    expect(screen.getByText(/Already done/)).toBeInTheDocument();
    expect(screen.getByText(/This todo is not done/)).toBeInTheDocument();
    expect(screen.getByText(/This todo is done/)).toBeInTheDocument();
  });

  test('calls completeTodo when Set as done is clicked', () => {
    render(<TodoList todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

    const completeBtn = screen.getByRole('button', { name: /set as done/i });
    fireEvent.click(completeBtn);

    expect(completeTodo).toHaveBeenCalledWith(todos[0]);
  });

  test('calls deleteTodo when Delete is clicked', () => {
    render(<TodoList todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons.length).toBe(2);

    fireEvent.click(deleteButtons[0]);
    expect(deleteTodo).toHaveBeenCalledWith(todos[0]);

    fireEvent.click(deleteButtons[1]);
    expect(deleteTodo).toHaveBeenCalledWith(todos[1]);
  });
});
