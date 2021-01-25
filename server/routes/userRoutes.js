import express from 'express';
const router = express.Router();
import orderRouter from './orderRoutes.js';
import { signup, login, isLoggedIn, logout, protect } from '../controller/authController.js';
import { getUserProfile, updateUserProfile } from '../controller/userController.js';

router.use('/:userId/orders', orderRouter);

//Public
router.get('/', isLoggedIn);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

//Private
router.use(protect);
router.route('/profile').get(getUserProfile).patch(updateUserProfile);

export default router;
