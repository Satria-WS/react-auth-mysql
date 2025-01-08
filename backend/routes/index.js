import express from 'express';
import {
  deleteAllUsers,
  deleteUserById,
  getUsers,
  Login,
  Logout,
  Register,
} from '../controllers/Users.js';
import { verifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controllers/RefreshToken.js';

const router = express.Router();
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.delete('/users/:id', verifyToken, deleteUserById);
router.delete('/users', verifyToken, deleteAllUsers); // Add this line
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
