import React, { useEffect, useState } from 'react';
import { Todo, CreateTodoDTO, UpdateTodoDTO, TodoStatus } from '../types';
import { useTodoStore } from '../stores/todoStore';
import { todoService } from '../services/todoService';
import { TodoForm } from '../components/TodoForm';
import { TodoFilters } from '../components/TodoFilters';
import { TodoList } from '../components/TodoList';

export const HomePage: React.FC = () => {
  const { todos, loading, error, filters, setTodos, setLoading, setError, addTodo, removeTodo, updateTodo, setFilters, clearFilters } = useTodoStore();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    loadTodos();
  }, [filters]);

  const loadTodos = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedTodos = await todoService.listTodos(filters);
      setTodos(fetchedTodos);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (data: CreateTodoDTO) => {
    setLoading(true);
    setError(null);

    try {
      const newTodo = await todoService.createTodo(data);
      addTodo(newTodo);
      setShowForm(false);
      setSuccessMessage('✅ Tarefa criada com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar tarefa');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (data: UpdateTodoDTO) => {
    if (!editingTodo) return;

    setLoading(true);
    setError(null);

    try {
      const updatedTodo = await todoService.updateTodo(editingTodo.id, data);
      updateTodo(updatedTodo);
      setEditingTodo(null);
      setSuccessMessage('✅ Tarefa atualizada com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar tarefa');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setError(null);

    try {
      await todoService.deleteTodo(id);
      removeTodo(id);
      setSuccessMessage('✅ Tarefa deletada com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar tarefa');
    }
  };

  const handleStatusChange = async (id: number, status: TodoStatus) => {
    setError(null);

    try {
      const updatedTodo = await todoService.updateTodo(id, { status });
      updateTodo(updatedTodo);
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar status');
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    if (value === '') {
      const newFilters = { ...filters };
      delete newFilters[key as keyof typeof filters];
      setFilters(newFilters);
    } else {
      setFilters({ [key]: value });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>✓ Todo App</h1>
          <p className='text-gray-600'>Organize suas tarefas de forma simples e eficiente</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className='mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-pulse'>
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
            ⚠️ {error}
          </div>
        )}

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Sidebar - Filters */}
          <div className='lg:col-span-1'>
            <TodoFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content - Form + List */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Toggle Form Button */}
            {!showForm && !editingTodo && (
              <button
                onClick={() => setShowForm(true)}
                className='w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition text-lg'
              >
                ➕ Criar Nova Tarefa
              </button>
            )}

            {/* Create Form */}
            {showForm && !editingTodo && (
              <>
                <h2 className='text-2xl font-bold text-gray-800'>Criar Nova Tarefa</h2>
                <TodoForm
                  onSubmit={handleCreateTodo}
                  onCancel={() => setShowForm(false)}
                  loading={loading}
                />
              </>
            )}

            {/* Edit Form */}
            {editingTodo && (
              <>
                <h2 className='text-2xl font-bold text-gray-800'>Editar Tarefa</h2>
                <TodoForm
                  initialTodo={editingTodo}
                  onSubmit={handleUpdateTodo}
                  onCancel={() => setEditingTodo(null)}
                  loading={loading}
                />
              </>
            )}

            {/* Todo List */}
            <div>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                Tarefas ({todos.length})
              </h2>
              <TodoList
                todos={todos}
                loading={loading}
                onEdit={(todo) => {
                  setEditingTodo(todo);
                  setShowForm(false);
                }}
                onDelete={handleDeleteTodo}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='mt-12 text-center text-gray-600 text-sm border-t border-gray-300 pt-6'>
          <p>Todo App v1.0 • Desenvolvido com React, TypeScript e Vite</p>
        </div>
      </div>
    </div>
  );
};
