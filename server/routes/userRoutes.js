import express from 'express';
const router = express.Router();
import { signup, login, isLoggedIn, logout, protect } from '../controller/authController.js';
import { getUserProfile, updateUserProfile, getUserOrders } from '../controller/userController.js';

//Public
router.get('/', isLoggedIn);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

//Private
router.use(protect);
router.route('/profile').get(getUserProfile).patch(updateUserProfile);

router.route('/orders').get(getUserOrders);

export default router;
