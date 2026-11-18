import { Todo, CreateTodoDTO, UpdateTodoDTO, TodoStatus, TodoPriority } from '../types';
import db from '../database/db';

export class TodoRepository {
  /**
   * Criar nova tarefa
   */
  static create(dto: CreateTodoDTO): Promise<Todo> {
    return new Promise((resolve, reject) => {
      const { title, description = '', priority = 'medium', dueDate = null, category = '' } = dto;

      db.run(
        `INSERT INTO todos (title, description, priority, due_date, category, status)
         VALUES (?, ?, ?, ?, ?, 'pending')`,
        [title, description, priority, dueDate, category],
        function (err) {
          if (err) {
            reject(err);
          } else {
            TodoRepository.getById(this.lastID)
              .then((todo) => {
                if (todo) {
                  resolve(todo);
                } else {
                  reject(new Error('Tarefa criada não foi encontrada'));
                }
              })
              .catch(reject);
          }
        }
      );
    });
  }

  /**
   * Obter tarefa por ID
   */
  static getById(id: number): Promise<Todo | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row: any) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(TodoRepository.mapRowToTodo(row));
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Listar todas as tarefas com filtros e ordenação
   */
  static getAll(filters?: {
    status?: TodoStatus;
    priority?: TodoPriority;
    category?: string;
    sort?: keyof Todo;
    order?: 'asc' | 'desc';
  }): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM todos WHERE 1 = 1';
      const params: any[] = [];

      // Aplicar filtros
      if (filters?.status) {
        query += ' AND status = ?';
        params.push(filters.status);
      }

      if (filters?.priority) {
        query += ' AND priority = ?';
        params.push(filters.priority);
      }

      if (filters?.category) {
        query += ' AND category = ?';
        params.push(filters.category);
      }

      // Ordenação
      const sortColumnMap: Record<string, string> = {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        dueDate: 'due_date',
        priority: 'priority',
        status: 'status',
        title: 'title',
      };

      const sortColumn = filters?.sort ? sortColumnMap[filters.sort] || 'created_at' : 'created_at';
      const sortOrder = filters?.order === 'asc' ? 'ASC' : 'DESC';
      query += ` ORDER BY ${sortColumn} ${sortOrder}`;

      db.all(query, params, (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(TodoRepository.mapRowToTodo));
        }
      });
    });
  }

  /**
   * Atualizar tarefa
   */
  static update(id: number, dto: UpdateTodoDTO): Promise<Todo | null> {
    return new Promise((resolve, reject) => {
      const updates: string[] = [];
      const params: any[] = [];

      if (dto.title !== undefined) {
        updates.push('title = ?');
        params.push(dto.title);
      }

      if (dto.description !== undefined) {
        updates.push('description = ?');
        params.push(dto.description);
      }

      if (dto.status !== undefined) {
        updates.push('status = ?');
        params.push(dto.status);
      }

      if (dto.priority !== undefined) {
        updates.push('priority = ?');
        params.push(dto.priority);
      }

      if (dto.dueDate !== undefined) {
        updates.push('due_date = ?');
        params.push(dto.dueDate);
      }

      if (dto.category !== undefined) {
        updates.push('category = ?');
        params.push(dto.category);
      }

      if (updates.length === 0) {
        resolve(TodoRepository.getById(id));
        return;
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      params.push(id);

      const query = `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`;

      db.run(query, params, (err) => {
        if (err) {
          reject(err);
        } else {
          TodoRepository.getById(id).then(resolve).catch(reject);
        }
      });
    });
  }

  /**
   * Deletar tarefa
   */
  static delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  /**
   * Mapear row do banco de dados para interface Todo
   */
  private static mapRowToTodo(row: any): Todo {
    return {
      id: row.id,
      title: row.title,
      description: row.description || undefined,
      status: row.status as TodoStatus,
      priority: row.priority as TodoPriority,
      dueDate: row.due_date || undefined,
      category: row.category || undefined,
      createdAt: new Date(row.created_at).toISOString(),
      updatedAt: new Date(row.updated_at).toISOString(),
    };
  }
}
