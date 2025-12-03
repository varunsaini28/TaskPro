import express from 'express';
import { login, logout, profile, register } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router=express.Router();

router.post('/register', register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me',authMiddleware,profile)


export default router;