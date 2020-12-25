import express from 'express';
const router = express.Router();
import {protect} from '../controller/authController.js';
import {createOrder, getOrder, updateOrderToPaid} from '../controller/orderController.js';

router.use(protect);
router.route('/')
           .post(createOrder)

router.route('/:id')           
           .get(getOrder)
           .patch(updateOrderToPaid);

export default router;           