import {
  CATEGORIES,
  CATEGORY_LABELS,
  PRIORITIES,
  PRIORITY_LABELS,
} from "../constants";
import {
  Category,
  FilterState,
  Priority,
  SortDirection,
  SortField,
} from "../types";

// kontrolowany pasek filtrów, stan jest w rodzicu
type FiltersProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
};

export default function Filters({ filters, onChange }: FiltersProps) {
  // zmieniamy tylko część pól, resztę zostawiamy
  function update(changes: Partial<FilterState>) {
    onChange({ ...filters, ...changes });
  }

  return (
    <div className="filters">
      <div className="field field-wide">
        <label htmlFor="search">Szukaj po tytule</label>
        <input
          id="search"
          type="search"
          className="control"
          placeholder="Wpisz tytuł..."
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor="filter-category">Kategoria</label>
        <select
          id="filter-category"
          className="control"
          value={filters.category}
          onChange={(e) =>
            update({ category: e.target.value as Category | "all" })
          }
        >
          <option value="all">Wszystkie</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="filter-priority">Priorytet</label>
        <select
          id="filter-priority"
          className="control"
          value={filters.priority}
          onChange={(e) =>
            update({ priority: e.target.value as Priority | "all" })
          }
        >
          <option value="all">Wszystkie</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {PRIORITY_LABELS[priority]}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort-field">Sortuj według</label>
        <select
          id="sort-field"
          className="control"
          value={filters.sortField}
          onChange={(e) => update({ sortField: e.target.value as SortField })}
        >
          <option value="dueDate">Terminu</option>
          <option value="title">Tytułu</option>
          <option value="priority">Priorytetu</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort-direction">Kolejność</label>
        <select
          id="sort-direction"
          className="control"
          value={filters.sortDirection}
          onChange={(e) =>
            update({ sortDirection: e.target.value as SortDirection })
          }
        >
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
      </div>
    </div>
  );
}
