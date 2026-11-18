import React from 'react';
import { Todo, TodoStatus, TodoPriority } from '../types';

interface TodoFiltersProps {
  filters: {
    status?: TodoStatus;
    priority?: TodoPriority;
    category?: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({ filters, onFilterChange, onClearFilters }) => {
  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== '');

  return (
    <div className='p-4 bg-white rounded-lg border border-gray-300 space-y-4'>
      <h2 className='text-lg font-semibold text-gray-800'>Filtros</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label htmlFor='status-filter' className='block text-sm font-semibold text-gray-700 mb-1'>
            Status
          </label>
          <select
            id='status-filter'
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Todos os status</option>
            <option value='pending'>Pendente</option>
            <option value='in_progress'>Em Progresso</option>
            <option value='completed'>Completo</option>
          </select>
        </div>

        <div>
          <label htmlFor='priority-filter' className='block text-sm font-semibold text-gray-700 mb-1'>
            Prioridade
          </label>
          <select
            id='priority-filter'
            value={filters.priority || ''}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Todas as prioridades</option>
            <option value='low'>Baixa</option>
            <option value='medium'>Média</option>
            <option value='high'>Alta</option>
          </select>
        </div>

        <div>
          <label htmlFor='category-filter' className='block text-sm font-semibold text-gray-700 mb-1'>
            Categoria
          </label>
          <select
            id='category-filter'
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Todas as categorias</option>
            <option value='Work'>Trabalho</option>
            <option value='Personal'>Pessoal</option>
            <option value='Shopping'>Compras</option>
            <option value='Health'>Saúde</option>
            <option value='Other'>Outro</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className='w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition'
        >
          Limpar Filtros
        </button>
      )}
    </div>
  );
};
