import { Router } from 'express';
const router = Router();
import { register, login , getAllUsers, searchUsers} from '../controller/auth.controller.js'
router.post('/register', register);
router.post('/login', login);
router.get('/getAllusers', getAllUsers);
router.get('/search', searchUsers);  // new search API

export default router;