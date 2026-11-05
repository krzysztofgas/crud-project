import { PRIORITY_ORDER } from "./constants";
import { FilterState, Todo } from "./types";

// wyszukiwanie, filtrowanie i sortowanie w jednym miejscu, dzięki temu działają razem
export function filterAndSortTodos(todos: Todo[], filters: FilterState) {
  const search = filters.search.trim().toLowerCase();

  // 1. zostawiamy tylko zadania pasujące do wszystkiego
  const filtered = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(search);
    const matchesCategory =
      filters.category === "all" || todo.category === filters.category;
    const matchesPriority =
      filters.priority === "all" || todo.priority === filters.priority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  // 2. sortujemy wynik (filter zrobił nową tablicę, więc można)
  return filtered.sort((a, b) => {
    let result = 0;

    if (filters.sortField === "title") {
      // "pl" = polska kolejność liter (ą, ł, ś...)
      result = a.title.localeCompare(b.title, "pl");
    } else if (filters.sortField === "dueDate") {
      // daty wyglądają jak 2026-11-05, więc porównanie tekstu działa
      result = a.dueDate.localeCompare(b.dueDate);
    } else {
      result = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    }

    // malejąco = to samo, ale odwrócone
    return filters.sortDirection === "asc" ? result : -result;
  });
}
