import TodoList from "./components/TodoList";
import { initialTodos } from "./data";

export default function Home() {
  return (
    <main>
      <h1>Todo list</h1>
      <TodoList todos={initialTodos} />
    </main>
  );
}
