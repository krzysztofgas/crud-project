export type Priority = "low" | "medium" | "high";
export type Category = "home" | "study" | "work";

export type Todo = {
  id: number;
  title: string;
  priority: Priority;
  category: Category;
  dueDate: string;
  completed: boolean;
};
