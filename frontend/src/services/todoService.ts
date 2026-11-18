import axios from 'axios';
import { Todo, CreateTodoDTO, UpdateTodoDTO, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoService = {
  /**
   * Criar tarefa
   */
  async createTodo(dto: CreateTodoDTO): Promise<Todo> {
    const response = await apiClient.post<ApiResponse<Todo>>('/todos', dto);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message);
  },

  /**
   * Listar tarefas
   */
  async listTodos(filters?: {
    status?: string;
    priority?: string;
    category?: string;
    sort?: string;
    order?: string;
  }): Promise<Todo[]> {
    const response = await apiClient.get<ApiResponse<Todo[]>>('/todos', { params: filters });
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message);
  },

  /**
   * Obter tarefa por ID
   */
  async getTodo(id: number): Promise<Todo> {
    const response = await apiClient.get<ApiResponse<Todo>>(`/todos/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message);
  },

  /**
   * Atualizar tarefa
   */
  async updateTodo(id: number, dto: UpdateTodoDTO): Promise<Todo> {
    const response = await apiClient.put<ApiResponse<Todo>>(`/todos/${id}`, dto);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message);
  },

  /**
   * Deletar tarefa
   */
  async deleteTodo(id: number): Promise<void> {
    const response = await apiClient.delete<ApiResponse<null>>(`/todos/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  },
};
