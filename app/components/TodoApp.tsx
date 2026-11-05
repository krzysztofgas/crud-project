"use client";
import { useState } from "react";
import { DEFAULT_FILTERS, PAGE_SIZE } from "../constants";
import { initialTodos } from "../data";
import { filterAndSortTodos } from "../todoUtils";
import { FilterState, Todo } from "../types";
import Button from "./Button";
import Dialog from "./Dialog";
import Filters from "./Filters";
import Pagination from "./Pagination";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoApp() {
  // cały stan aplikacji jest tutaj
  const [todos, setTodos] = useState(initialTodos);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  // wartości obliczane ze stanu (nie trzymamy ich w stanie)
  const visibleTodos = filterAndSortTodos(todos, filters);
  const totalPages = Math.max(1, Math.ceil(visibleTodos.length / PAGE_SIZE));
  // jeśli ostatnia strona zniknie (usuwanie, filtry), wracamy na ostatnią istniejącą
  const currentPage = Math.min(page, totalPages);
  const firstIndex = (currentPage - 1) * PAGE_SIZE;
  const pageTodos = visibleTodos.slice(firstIndex, firstIndex + PAGE_SIZE);

  // zmiana filtrów zawsze wraca na stronę 1
  function handleFiltersChange(newFilters: FilterState) {
    setFilters(newFilters);
    setPage(1);
  }

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

  // wywoływane po kliknięciu "Tak, usuń" w dialogu
  function confirmDelete() {
    if (todoToDelete !== null) {
      deleteTodo(todoToDelete);
      setTodoToDelete(null);
    }
  }

  function addTodo(data: Omit<Todo, "id">) {
    // nowe id = największe id + 1 (length + 1 mogłoby powtórzyć id po usunięciu)
    const ids = todos.map((todo) => todo.id);
    const newId = Math.max(0, ...ids) + 1;
    const newTodo: Todo = { id: newId, ...data };
    setTodos([...todos, newTodo]);
  }

  function updateTodo(data: Omit<Todo, "id">) {
    if (todoToEdit === null) return;

    // podmieniamy tylko edytowane zadanie, id zostaje to samo
    const newTodos = todos.map((todo) => {
      if (todo.id === todoToEdit.id) {
        return { ...todo, ...data };
      }

      return todo;
    });
    setTodos(newTodos);
  }

  function openAddForm() {
    setTodoToEdit(null);
    setIsFormOpen(true);
  }

  function openEditForm(todo: Todo) {
    setTodoToEdit(todo);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
  }

  // ten sam formularz do dodawania i edycji, tu tylko wybieramy co zrobić z danymi
  function handleFormSubmit(data: Omit<Todo, "id">) {
    if (todoToEdit !== null) {
      updateTodo(data);
    } else {
      addTodo(data);
    }

    closeForm();
  }

  return (
    <>
      <Filters filters={filters} onChange={handleFiltersChange} />

      <div className="list-header">
        <p className="results">
          Wyświetlono {visibleTodos.length} z {todos.length} zadań
        </p>
        <Button variant="primary" onClick={openAddForm}>
          Dodaj zadanie
        </Button>
      </div>

      <TodoList
        todos={pageTodos}
        onToggle={toggleCompleted}
        onEdit={openEditForm}
        onDelete={setTodoToDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* dialog nr 1: pyta przed usunięciem */}
      {todoToDelete !== null && (
        <Dialog title="Czy na pewno?" onClose={() => setTodoToDelete(null)}>
          <p>Tej operacji nie można cofnąć.</p>
          <div className="dialog-actions">
            <Button onClick={() => setTodoToDelete(null)}>Anuluj</Button>
            <Button variant="danger" onClick={confirmDelete}>
              Tak, usuń
            </Button>
          </div>
        </Dialog>
      )}

      {/* dialog nr 2: formularz dodawania / edycji */}
      {isFormOpen && (
        <Dialog
          title={todoToEdit ? "Edytuj zadanie" : "Dodaj zadanie"}
          onClose={closeForm}
        >
          <TodoForm
            todo={todoToEdit ?? undefined}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
          />
        </Dialog>
      )}
    </>
  );
}
