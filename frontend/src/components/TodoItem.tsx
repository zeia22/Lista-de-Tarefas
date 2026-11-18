import React from 'react';
import { Todo, TodoPriority, TodoStatus } from '../types';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TodoStatus) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, onStatusChange }) => {
  const priorityColors: Record<TodoPriority, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusIcons: Record<TodoStatus, string> = {
    pending: '⭕',
    in_progress: '🔄',
    completed: '✅',
  };

  const statusColors: Record<TodoStatus, string> = {
    pending: 'text-gray-500',
    in_progress: 'text-blue-500',
    completed: 'text-green-500 line-through',
  };

  const isUrgent = todo.priority === 'high' && todo.dueDate && new Date(todo.dueDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <div
      className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition ${
        isUrgent ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200'
      }`}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1'>
          <div className='flex items-center gap-2 mb-2'>
            <span className={`text-xl ${statusColors[todo.status]}`}>{statusIcons[todo.status]}</span>
            <h3 className={`text-lg font-semibold ${statusColors[todo.status]}`}>{todo.title}</h3>
          </div>

          {todo.description && <p className='text-gray-600 text-sm mb-2'>{todo.description}</p>}

          <div className='flex items-center gap-2 flex-wrap'>
            <span className={`px-2 py-1 text-xs font-semibold rounded ${priorityColors[todo.priority]}`}>
              {todo.priority.toUpperCase()}
            </span>

            {todo.category && (
              <span className='px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded'>{todo.category}</span>
            )}

            {todo.dueDate && (
              <span className='text-xs text-gray-500'>
                📅 {new Date(todo.dueDate).toLocaleDateString('pt-BR')}
              </span>
            )}
          </div>
        </div>

        <div className='flex gap-2'>
          <select
            value={todo.status}
            onChange={(e) => onStatusChange(todo.id, e.target.value as TodoStatus)}
            className='px-2 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50'
          >
            <option value='pending'>Pendente</option>
            <option value='in_progress'>Em Progresso</option>
            <option value='completed'>Completo</option>
          </select>

          <button
            onClick={() => onEdit(todo)}
            className='px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition'
          >
            Editar
          </button>

          <button
            onClick={() => {
              if (confirm('Tem certeza que deseja deletar esta tarefa? Esta ação é irreversível.')) {
                onDelete(todo.id);
              }
            }}
            className='px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition'
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};
