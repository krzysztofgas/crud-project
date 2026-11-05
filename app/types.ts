// dozwolone wartości priorytetu i kategorii
export type Priority = "low" | "medium" | "high";
export type Category = "home" | "study" | "work";

// zadanie
export type Todo = {
  id: number;
  title: string;
  priority: Priority;
  category: Category;
  dueDate: string;
  completed: boolean;
};

// po czym sortujemy i w którą stronę
export type SortField = "title" | "dueDate" | "priority";
export type SortDirection = "asc" | "desc";

// wszystko, co użytkownik ustawia w filtrach
export type FilterState = {
  search: string;
  category: Category | "all";
  priority: Priority | "all";
  sortField: SortField;
  sortDirection: SortDirection;
};
