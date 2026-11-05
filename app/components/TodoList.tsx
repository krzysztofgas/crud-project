import { Todo } from "../types";
import TodoItem from "./TodoItem";

// pokazuje zadania, które dostanie, albo komunikat gdy ich nie ma
type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps) {
  // pusty widok
  if (todos.length === 0) {
    return (
      <p className="empty">
        Nie znaleziono zadań. Zmień wyszukiwanie lub filtry albo dodaj nowe
        zadanie.
      </p>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
