import express from 'express';
const router = express.Router();
import {protect} from '../controller/authController.js';
import {createOrder} from '../controller/orderController.js';

router.use(protect);
router.route('/')
           .post(createOrder)

export default router;           