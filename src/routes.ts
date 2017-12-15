import { Router } from 'express';
import taskController from './controllers/HelloController';

const router = Router();

router.get('/hello', taskController.indexAction.bind(taskController));

export default router;