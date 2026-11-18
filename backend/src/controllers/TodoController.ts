import { Request, Response } from 'express';
import { TodoService } from '../services/TodoService';
import { ApiResponse, CreateTodoDTO, UpdateTodoDTO, Todo, TodoStatus, TodoPriority } from '../types';

export class TodoController {
  /**
   * POST /api/todos - Criar tarefa
   */
  static async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateTodoDTO = req.body;
      const todo = await TodoService.createTodo(dto);

      const response: ApiResponse<Todo> = {
        success: true,
        data: todo,
        message: 'Tarefa criada com sucesso',
      };

      res.status(201).json(response);
    } catch (error: any) {
      const statusCode = error.status || 500;
      const response: ApiResponse<null> = {
        success: false,
        error: error.message || 'Erro ao criar tarefa',
        message: error.message || 'Erro ao criar tarefa',
        ...(error.field && { details: { field: error.field } }),
      };

      res.status(statusCode).json(response);
    }
  }

  /**
   * GET /api/todos - Listar tarefas
   */
  static async listTodos(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        status: (req.query.status as TodoStatus) || undefined,
        priority: (req.query.priority as TodoPriority) || undefined,
        category: (req.query.category as string) || undefined,
        sort: (req.query.sort as keyof Todo) || 'createdAt',
        order: (req.query.order as 'asc' | 'desc') || 'desc',
      };

      const todos = await TodoService.listTodos(filters);

      const response: ApiResponse<Todo[]> = {
        success: true,
        data: todos,
        message: `${todos.length} tarefa(s) recuperada(s)`,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse<null> = {
        success: false,
        error: error.message || 'Erro ao listar tarefas',
        message: error.message || 'Erro ao listar tarefas',
      };

      res.status(500).json(response);
    }
  }

  /**
   * GET /api/todos/:id - Obter tarefa por ID
   */
  static async getTodo(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'ID inválido',
          message: 'ID deve ser um número válido',
        };

        res.status(400).json(response);
        return;
      }

      const todo = await TodoService.getTodoById(id);

      const response: ApiResponse<Todo> = {
        success: true,
        data: todo,
        message: 'Tarefa encontrada',
      };

      res.status(200).json(response);
    } catch (error: any) {
      const statusCode = error.status || 500;
      const response: ApiResponse<null> = {
        success: false,
        error: error.message || 'Erro ao buscar tarefa',
        message: error.message || 'Erro ao buscar tarefa',
      };

      res.status(statusCode).json(response);
    }
  }

  /**
   * PUT /api/todos/:id - Atualizar tarefa
   */
  static async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'ID inválido',
          message: 'ID deve ser um número válido',
        };

        res.status(400).json(response);
        return;
      }

      const dto: UpdateTodoDTO = req.body;
      const todo = await TodoService.updateTodo(id, dto);

      const response: ApiResponse<Todo> = {
        success: true,
        data: todo,
        message: 'Tarefa atualizada com sucesso',
      };

      res.status(200).json(response);
    } catch (error: any) {
      const statusCode = error.status || 500;
      const response: ApiResponse<null> = {
        success: false,
        error: error.message || 'Erro ao atualizar tarefa',
        message: error.message || 'Erro ao atualizar tarefa',
        ...(error.field && { details: { field: error.field } }),
      };

      res.status(statusCode).json(response);
    }
  }

  /**
   * DELETE /api/todos/:id - Deletar tarefa
   */
  static async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'ID inválido',
          message: 'ID deve ser um número válido',
        };

        res.status(400).json(response);
        return;
      }

      await TodoService.deleteTodo(id);

      const response: ApiResponse<{ id: number }> = {
        success: true,
        data: { id },
        message: 'Tarefa deletada com sucesso',
      };

      res.status(200).json(response);
    } catch (error: any) {
      const statusCode = error.status || 500;
      const response: ApiResponse<null> = {
        success: false,
        error: error.message || 'Erro ao deletar tarefa',
        message: error.message || 'Erro ao deletar tarefa',
      };

      res.status(statusCode).json(response);
    }
  }
}
