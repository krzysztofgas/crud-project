"use client";

import { useState } from "react";
import { Category, Priority, Todo } from "../types";

type TodoFormProps = {
  todo?: Todo;
  onSubmit: (todo: Omit<Todo, "id">) => void;
  onCancel: () => void;
};

export default function TodoForm({ todo, onSubmit, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(todo?.title ?? "");
  const [category, setCategory] = useState<Category>(todo?.category ?? "home");
  const [priority, setPriority] = useState<Priority>(
    todo?.priority ?? "medium",
  );
  const [completed, setCompleted] = useState<boolean>(todo?.completed ?? false);
  const [dueDate, setdueDate] = useState(todo?.dueDate ?? "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({
      title: title,
      category: category,
      priority: priority,
      completed: completed,
      dueDate: dueDate,
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="titleInput">Title</label>
      <input
        id="titleInput"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>

      <label htmlFor="categorySelector">Category</label>
      <select
        id="categorySelector"
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        <option value="home">Home</option>
        <option value="study">Study</option>
        <option value="work">Work</option>
      </select>

      <label>Priority</label>
      <label>
        <input
          type="radio"
          name="priority"
          value="low"
          onChange={(e) => setPriority(e.target.value as Priority)}
          checked={priority === "low"}
        ></input>
        Low
      </label>
      <label>
        <input
          type="radio"
          name="priority"
          value="medium"
          onChange={(e) => setPriority(e.target.value as Priority)}
          checked={priority === "medium"}
        ></input>
        Medium
      </label>
      <label>
        <input
          type="radio"
          name="priority"
          value="high"
          onChange={(e) => setPriority(e.target.value as Priority)}
          checked={priority === "high"}
        ></input>
        High
      </label>

      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        ></input>
        Completed
      </label>

      <label htmlFor="duedate">
        <input
          id="duedate"
          type="date"
          value={dueDate}
          onChange={(e) => setdueDate(e.target.value)}
        ></input>
        Due Date
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => onCancel()}>
        Cancel
      </button>
    </form>
  );
}
