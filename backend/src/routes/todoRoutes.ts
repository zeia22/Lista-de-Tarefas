import { Router } from 'express';
import { TodoController } from '../controllers/TodoController';

const router = Router();

// CRUD routes
router.post('/todos', TodoController.createTodo);
router.get('/todos', TodoController.listTodos);
router.get('/todos/:id', TodoController.getTodo);
router.put('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);

export default router;
