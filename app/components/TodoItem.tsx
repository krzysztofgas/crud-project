import { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      <strong>{todo.title}</strong>
      <p>{todo.priority}</p>
      <p>{todo.category}</p>
      <p>{todo.dueDate}</p>
      <p>{todo.completed ? "Done" : "Not done"}</p>
    </li>
  );
}
