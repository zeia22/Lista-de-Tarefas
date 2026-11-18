import { create } from 'zustand';
import { Todo, TodoStatus, TodoPriority } from '../types';

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  filters: {
    status?: TodoStatus;
    priority?: TodoPriority;
    category?: string;
  };
  setTodos: (todos: Todo[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
  setFilters: (filters: Partial<TodoStore['filters']>) => void;
  clearFilters: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  error: null,
  filters: {},
  setTodos: (todos) => set({ todos }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
  updateTodo: (todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    })),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearFilters: () => set({ filters: {} }),
}));
