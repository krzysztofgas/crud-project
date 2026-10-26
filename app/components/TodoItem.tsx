import { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <strong>{todo.title}</strong>
      <p>{todo.priority}</p>
      <p>{todo.category}</p>
      <p>{todo.dueDate}</p>
      <p>{todo.completed ? "Done" : "Not done"}</p>
      <button onClick={() => onToggle(todo.id)}>Toggle</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
