import React, { useState } from 'react';
import { Todo, TodoPriority } from '../types';

interface TodoFormProps {
  initialTodo?: Todo | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ initialTodo, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: initialTodo?.title || '',
    description: initialTodo?.description || '',
    priority: (initialTodo?.priority || 'medium') as TodoPriority,
    category: initialTodo?.category || '',
    dueDate: initialTodo?.dueDate || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Título não pode exceder 255 caracteres';
    }

    if (formData.description.length > 1000) {
      newErrors.description = 'Descrição não pode exceder 1000 caracteres';
    }

    if (formData.category.length > 50) {
      newErrors.category = 'Categoria não pode exceder 50 caracteres';
    }

    if (formData.dueDate) {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        newErrors.dueDate = 'Data de vencimento não pode ser no passado';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      if (!initialTodo) {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          category: '',
          dueDate: '',
        });
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 p-4 bg-white rounded-lg border border-gray-300'>
      <div>
        <label htmlFor='title' className='block text-sm font-semibold text-gray-700 mb-1'>
          Título *
        </label>
        <input
          type='text'
          id='title'
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            setErrors({ ...errors, title: '' });
          }}
          placeholder='Digite o título da tarefa'
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor='description' className='block text-sm font-semibold text-gray-700 mb-1'>
          Descrição
        </label>
        <textarea
          id='description'
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
            setErrors({ ...errors, description: '' });
          }}
          placeholder='Digite a descrição (opcional)'
          rows={3}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description}</p>}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label htmlFor='priority' className='block text-sm font-semibold text-gray-700 mb-1'>
            Prioridade
          </label>
          <select
            id='priority'
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as TodoPriority })}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            disabled={loading}
          >
            <option value='low'>Baixa</option>
            <option value='medium'>Média</option>
            <option value='high'>Alta</option>
          </select>
        </div>

        <div>
          <label htmlFor='category' className='block text-sm font-semibold text-gray-700 mb-1'>
            Categoria
          </label>
          <select
            id='category'
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
              setErrors({ ...errors, category: '' });
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          >
            <option value=''>Selecione uma categoria</option>
            <option value='Work'>Trabalho</option>
            <option value='Personal'>Pessoal</option>
            <option value='Shopping'>Compras</option>
            <option value='Health'>Saúde</option>
            <option value='Other'>Outro</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor='dueDate' className='block text-sm font-semibold text-gray-700 mb-1'>
          Data de Vencimento
        </label>
        <input
          type='date'
          id='dueDate'
          value={formData.dueDate}
          onChange={(e) => {
            setFormData({ ...formData, dueDate: e.target.value });
            setErrors({ ...errors, dueDate: '' });
          }}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.dueDate ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.dueDate && <p className='text-red-500 text-sm mt-1'>{errors.dueDate}</p>}
      </div>

      <div className='flex gap-2 justify-end'>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition disabled:opacity-50'
            disabled={loading}
          >
            Cancelar
          </button>
        )}

        <button
          type='submit'
          disabled={loading || !formData.title.trim()}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Salvando...' : initialTodo ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};
