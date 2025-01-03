import express from 'express';
import { getUsers, Login, Register } from '../controllers/Users.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);

export default router;
