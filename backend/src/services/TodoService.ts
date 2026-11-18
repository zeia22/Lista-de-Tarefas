import { Todo, CreateTodoDTO, UpdateTodoDTO, TodoStatus, TodoPriority } from '../types';
import { TodoRepository } from '../repository/TodoRepository';

export class TodoService {
  /**
   * Criar tarefa com validações
   */
  static async createTodo(dto: CreateTodoDTO): Promise<Todo> {
    // Validar título (BR-001)
    if (!dto.title || dto.title.trim().length === 0) {
      throw { status: 400, message: 'Título é obrigatório', field: 'title' };
    }

    if (dto.title.length > 255) {
      throw { status: 400, message: 'Título não pode exceder 255 caracteres', field: 'title' };
    }

    // Validar prioridade (BR-002)
    const validPriorities: TodoPriority[] = ['low', 'medium', 'high'];
    if (dto.priority && !validPriorities.includes(dto.priority)) {
      throw { status: 400, message: 'Prioridade inválida', field: 'priority' };
    }

    // Validar descrição (BR-005)
    if (dto.description && dto.description.length > 1000) {
      throw { status: 400, message: 'Descrição não pode exceder 1000 caracteres', field: 'description' };
    }

    // Validar categoria (BR-006)
    if (dto.category && dto.category.length > 50) {
      throw { status: 400, message: 'Categoria não pode exceder 50 caracteres', field: 'category' };
    }

    // Validar data de vencimento (BR-004)
    if (dto.dueDate) {
      const dueDate = new Date(dto.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        throw { status: 400, message: 'Data de vencimento não pode ser no passado', field: 'dueDate' };
      }
    }

    // Trim valores de string
    const cleanedDto: CreateTodoDTO = {
      ...dto,
      title: dto.title.trim(),
      description: dto.description?.trim(),
      category: dto.category?.trim(),
    };

    return await TodoRepository.create(cleanedDto);
  }

  /**
   * Obter tarefa por ID
   */
  static async getTodoById(id: number): Promise<Todo> {
    const todo = await TodoRepository.getById(id);

    if (!todo) {
      throw { status: 404, message: 'Tarefa não encontrada' };
    }

    return todo;
  }

  /**
   * Listar tarefas com filtros
   */
  static async listTodos(filters?: {
    status?: TodoStatus;
    priority?: TodoPriority;
    category?: string;
    sort?: keyof Todo;
    order?: 'asc' | 'desc';
  }): Promise<Todo[]> {
    return await TodoRepository.getAll(filters);
  }

  /**
   * Atualizar tarefa
   */
  static async updateTodo(id: number, dto: UpdateTodoDTO): Promise<Todo> {
    // Verificar se tarefa existe
    await this.getTodoById(id);

    // Validar título se fornecido (BR-010, BR-012)
    if (dto.title !== undefined) {
      if (dto.title.trim().length === 0) {
        throw { status: 400, message: 'Título não pode ser vazio', field: 'title' };
      }

      if (dto.title.length > 255) {
        throw { status: 400, message: 'Título não pode exceder 255 caracteres', field: 'title' };
      }
    }

    // Validar prioridade se fornecida
    if (dto.priority) {
      const validPriorities: TodoPriority[] = ['low', 'medium', 'high'];
      if (!validPriorities.includes(dto.priority)) {
        throw { status: 400, message: 'Prioridade inválida', field: 'priority' };
      }
    }

    // Validar status se fornecido
    if (dto.status) {
      const validStatuses: TodoStatus[] = ['pending', 'in_progress', 'completed'];
      if (!validStatuses.includes(dto.status)) {
        throw { status: 400, message: 'Status inválido', field: 'status' };
      }
    }

    // Validar descrição se fornecida
    if (dto.description !== undefined && dto.description.length > 1000) {
      throw { status: 400, message: 'Descrição não pode exceder 1000 caracteres', field: 'description' };
    }

    // Validar categoria se fornecida
    if (dto.category !== undefined && dto.category.length > 50) {
      throw { status: 400, message: 'Categoria não pode exceder 50 caracteres', field: 'category' };
    }

    // Validar data de vencimento se fornecida (BR-013)
    if (dto.dueDate) {
      const dueDate = new Date(dto.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        throw { status: 400, message: 'Data de vencimento não pode ser no passado', field: 'dueDate' };
      }
    }

    // Trim valores de string
    const cleanedDto: UpdateTodoDTO = {
      ...dto,
      title: dto.title?.trim(),
      description: dto.description?.trim(),
      category: dto.category?.trim(),
    };

    const updated = await TodoRepository.update(id, cleanedDto);

    if (!updated) {
      throw { status: 404, message: 'Tarefa não encontrada' };
    }

    return updated;
  }

  /**
   * Deletar tarefa
   */
  static async deleteTodo(id: number): Promise<void> {
    // Verificar se tarefa existe
    await this.getTodoById(id);

    const deleted = await TodoRepository.delete(id);

    if (!deleted) {
      throw { status: 404, message: 'Tarefa não encontrada' };
    }
  }
}
