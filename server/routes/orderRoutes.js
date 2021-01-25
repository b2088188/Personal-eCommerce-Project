import express from 'express';
const router = express.Router();
import { protect, restrictTo } from '../controller/authController.js';
import {
   createOrder,
   getOrder,
   getAllOrders,
   getUserOrders,
   updateOrderToPaid,
   updateOrderToDelivered
} from '../controller/orderController.js';

router.use(protect);
router.route('/').get(getUserOrders).post(createOrder).get(restrictTo('admin'), getAllOrders);
router.route('/:orderId').get(getOrder);
router.patch('/:orderId/pay', updateOrderToPaid);
router.patch('/:orderId/deliver', restrictTo('admin'), updateOrderToDelivered);

// router.get('/checkout-session/:orderId', getCheckoutSession);
// router.post('/charge', chargeTest);

export default router;
