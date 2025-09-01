import express from 'express';
import { getUser, login, register } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/user', authenticateUser, getUser)


export default router;
