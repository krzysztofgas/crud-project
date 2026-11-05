# Todo list – projekt zaliczeniowy (frontendowy CRUD)

Aplikacja do zarządzania zadaniami napisana w React (Next.js, TypeScript).
Działa tylko po stronie frontendu. Dane są w aplikacji i po odświeżeniu strony wracają do początkowych 12 zadań.

## Uruchomienie

```bash
pnpm i
pnpm dev
```

## Funkcje

- wyświetlanie zadań (tytuł, priorytet, kategoria, termin, status)
- dodawanie, edytowanie i usuwanie zadań (usuwanie z potwierdzeniem)
- jeden formularz do dodawania i edycji z walidacją i komunikatami błędów
- wyszukiwanie po tytule, filtrowanie po kategorii i priorytecie, sortowanie rosnąco i malejąco (po terminie, tytule lub priorytecie) – wszystko działa jednocześnie
- paginacja: maksymalnie 5 zadań na stronie
- komunikat, gdy lista wyników jest pusta
- własne style (`app/globals.css`) i układ responsywny

## Struktura projektu

| Plik                                          | Zadanie                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------- |
| `app/components/TodoApp.tsx`                  | główny stan aplikacji i wszystkie funkcje (dodaj, edytuj, usuń, filtry, strona) |
| `app/components/TodoList.tsx`, `TodoItem.tsx` | lista zadań i pojedynczy wiersz, pusty widok                                    |
| `app/components/TodoForm.tsx`                 | formularz dodawania i edycji (pole tekstowe, select, radio, checkbox, data)     |
| `app/components/Filters.tsx`                  | wyszukiwanie, filtrowanie i sortowanie                                          |
| `app/components/Dialog.tsx`                   | reużywalny dialog (potwierdzenie usunięcia i formularz)                         |
| `app/components/Pagination.tsx`               | reużywalna paginacja                                                            |
| `app/components/Button.tsx`                   | reużywalny przycisk z wariantami                                                |
| `app/todoUtils.ts`                            | funkcja łącząca wyszukiwanie, filtrowanie i sortowanie                          |
| `app/constants.ts`, `types.ts`, `data.ts`     | stałe, typy i dane początkowe                                                   |

## Jak to działa

- Stan (`todos`, `filters`, `page`, otwarte okna) jest w `TodoApp` i przekazywany w dół przez propsy.
- Lista widoczna na ekranie jest **obliczana** ze stanu: najpierw `filterAndSortTodos`, potem wycięcie 5 elementów dla bieżącej strony.
- Numer strony jest ograniczany do istniejących stron, dlatego po usunięciu ostatniego elementu na stronie aplikacja wraca na poprzednią stronę.
- Zmiana wyszukiwania lub filtrów zawsze przenosi na stronę 1.
- Formularz dostaje opcjonalny `todo`: gdy go nie ma – dodajemy, gdy jest – edytujemy.
