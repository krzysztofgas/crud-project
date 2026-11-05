import { Category, FilterState, Priority } from "./types";

// listy do budowania selectów i przycisków radio
export const PRIORITIES: Priority[] = ["low", "medium", "high"];
export const CATEGORIES: Category[] = ["home", "study", "work"];

// polskie nazwy do wyświetlania (w danych zostają wartości low, home itd.)
export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Niski",
  medium: "Średni",
  high: "Wysoki",
};
export const CATEGORY_LABELS: Record<Category, string> = {
  home: "Dom",
  study: "Nauka",
  work: "Praca",
};

// liczby, żeby dało się sortować priorytety (low < medium < high)
export const PRIORITY_ORDER: Record<Priority, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

// maksymalnie tyle zadań na jednej stronie
export const PAGE_SIZE = 5;

// filtry na początku
export const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "all",
  priority: "all",
  sortField: "dueDate",
  sortDirection: "asc",
};
