import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/').get(protect, getTasks).post(protect, createTask);

router
  .route('/:id')
  .get(protect, getTaskById)
  .patch(protect, updateTask) // Using PATCH is conventional for partial updates
  .delete(protect, deleteTask);

export default router;