import { Router } from 'express';
const router = Router();

import { register, login, getAllUsers, searchUsers } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

router.post('/register', register);
router.post('/login', login);
router.get('/getAllusers', authMiddleware, getAllUsers);
router.get('/search', authMiddleware, searchUsers);  // new search API

export default router;
