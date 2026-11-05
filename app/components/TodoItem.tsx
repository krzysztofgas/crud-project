import { CATEGORY_LABELS, PRIORITY_LABELS } from "../constants";
import { Todo } from "../types";
import Button from "./Button";

// jeden wiersz listy, tylko pokazuje dane i wywołuje funkcje od rodzica
type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <li className={todo.completed ? "todo todo-done" : "todo"}>
      <div>
        <strong className="todo-title">{todo.title}</strong>
        <div className="todo-meta">
          <span className={`badge badge-${todo.priority}`}>
            {PRIORITY_LABELS[todo.priority]}
          </span>
          <span className="badge">{CATEGORY_LABELS[todo.category]}</span>
          <span>Termin: {todo.dueDate}</span>
          <span>{todo.completed ? "Wykonane" : "Do zrobienia"}</span>
        </div>
      </div>

      <div className="todo-actions">
        <Button onClick={() => onToggle(todo.id)}>
          {todo.completed ? "Cofnij" : "Zrobione"}
        </Button>
        <Button onClick={() => onEdit(todo)}>Edytuj</Button>
        <Button variant="danger" onClick={() => onDelete(todo.id)}>
          Usuń
        </Button>
      </div>
    </li>
  );
}
