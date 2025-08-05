import { Router } from 'express';

const router = Router();
import { getAllUsers} from '../controller/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

router.get('/getAllusers',authMiddleware, getAllUsers);

export default router;