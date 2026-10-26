"use client";
import { useState } from "react";
import { initialTodos } from "../data";
import Dialog from "./Dialog";
import TodoList from "./TodoList";

export default function TodoApp() {
  const [todos, setTodos] = useState(initialTodos);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  function toggleCompleted(id: number) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });
    setTodos(newTodos);
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function confirmDelete() {
    if (todoToDelete !== null) {
      deleteTodo(todoToDelete);
      setTodoToDelete(null);
    }
  }

  return (
    <>
      <TodoList
        todos={todos}
        onToggle={toggleCompleted}
        onDelete={setTodoToDelete}
      />

      {todoToDelete !== null && (
        <Dialog title="Are you sure?" onClose={() => setTodoToDelete(null)}>
          <p>This cannot be undone</p>
          <button onClick={confirmDelete}>Yes, delete</button>
        </Dialog>
      )}
    </>
  );
}
