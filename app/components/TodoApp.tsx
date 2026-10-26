"use client";
import { useState } from "react";
import { initialTodos } from "../data";
import TodoList from "./TodoList";

export default function TodoApp() {
  const [todos, setTodos] = useState(initialTodos);

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

  return (
    <TodoList todos={todos} onToggle={toggleCompleted} onDelete={deleteTodo} />
  );
}
