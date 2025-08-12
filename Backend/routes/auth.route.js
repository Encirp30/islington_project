import { Router } from 'express';
const router = Router();

import {
  register,
  login,
  getAllUsers,
  searchUsers,
  getProfile,
  getUserById  // <-- add this
} from '../controller/auth.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

// Use authMiddleware on routes that require auth
router.get('/user/:id', authMiddleware, getUserById);

router.get('/profile', authMiddleware, getProfile);

router.post('/register', register);
router.post('/login', login);
router.get('/getAllusers', authMiddleware, getAllUsers);
router.get('/search', authMiddleware, searchUsers);  // add authMiddleware here too

export default router;
