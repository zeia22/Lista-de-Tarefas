import React from 'react';
import { Todo, TodoStatus } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TodoStatus) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, loading, onEdit, onDelete, onStatusChange }) => {
  if (loading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500 text-lg'>📭 Nenhuma tarefa encontrada</p>
        <p className='text-gray-400 text-sm mt-2'>Crie uma nova tarefa para começar!</p>
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
