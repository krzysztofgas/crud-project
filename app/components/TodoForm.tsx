"use client";

import { useState } from "react";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  PRIORITIES,
  PRIORITY_LABELS,
} from "../constants";
import { Category, Priority, Todo } from "../types";
import Button from "./Button";

// jeden formularz do dodawania i edycji: gdy jest "todo", to edytujemy
type TodoFormProps = {
  todo?: Todo;
  onSubmit: (todo: Omit<Todo, "id">) => void;
  onCancel: () => void;
};

// komunikaty błędów, pole ma komunikat tylko gdy jest błędne
type FormErrors = {
  title?: string;
  dueDate?: string;
};

export default function TodoForm({ todo, onSubmit, onCancel }: TodoFormProps) {
  // każde pole jest kontrolowane, startuje od zadania albo od wartości domyślnej
  const [title, setTitle] = useState(todo?.title ?? "");
  const [category, setCategory] = useState<Category>(todo?.category ?? "home");
  const [priority, setPriority] = useState<Priority>(
    todo?.priority ?? "medium",
  );
  const [completed, setCompleted] = useState<boolean>(todo?.completed ?? false);
  const [dueDate, setDueDate] = useState(todo?.dueDate ?? "");
  const [errors, setErrors] = useState<FormErrors>({});

  // sprawdza pola i zwraca znalezione błędy
  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      newErrors.title = "Tytuł jest wymagany.";
    } else if (trimmedTitle.length < 3) {
      newErrors.title = "Tytuł musi mieć co najmniej 3 znaki.";
    } else if (trimmedTitle.length > 60) {
      newErrors.title = "Tytuł może mieć najwyżej 60 znaków.";
    }

    if (dueDate === "") {
      newErrors.dueDate = "Wybierz termin wykonania.";
    }

    return newErrors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // nie przeładuj strony
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    // przerywamy, jeśli jest jakikolwiek błąd
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({ title: title.trim(), category, priority, completed, dueDate });
  }

  return (
    // noValidate = pokazujemy własne komunikaty, nie te z przeglądarki
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="todo-title">Tytuł</label>
        <input
          id="todo-title"
          type="text"
          className={errors.title ? "control invalid" : "control"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={errors.title ? true : undefined}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="error">
            {errors.title}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="todo-category">Kategoria</label>
        <select
          id="todo-category"
          className="control"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {CATEGORY_LABELS[option]}
            </option>
          ))}
        </select>
      </div>

      {/* fieldset + legend = grupa przycisków radio z tytułem */}
      <fieldset className="radio-group">
        <legend>Priorytet</legend>
        <div className="radio-options">
          {PRIORITIES.map((option) => (
            <label key={option} className="check">
              <input
                type="radio"
                name="priority"
                value={option}
                checked={priority === option}
                onChange={() => setPriority(option)}
              />
              {PRIORITY_LABELS[option]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="todo-due-date">Termin wykonania</label>
        <input
          id="todo-due-date"
          type="date"
          className={errors.dueDate ? "control invalid" : "control"}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-invalid={errors.dueDate ? true : undefined}
          aria-describedby={errors.dueDate ? "due-date-error" : undefined}
        />
        {errors.dueDate && (
          <p id="due-date-error" className="error">
            {errors.dueDate}
          </p>
        )}
      </div>

      <label className="check">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Wykonane
      </label>

      <div className="dialog-actions">
        <Button onClick={onCancel}>Anuluj</Button>
        <Button type="submit" variant="primary">
          Zapisz
        </Button>
      </div>
    </form>
  );
}
