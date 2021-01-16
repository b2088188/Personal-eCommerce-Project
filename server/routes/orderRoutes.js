import express from 'express';
const router = express.Router();
import { protect } from '../controller/authController.js';
import {
   createOrder,
   getOrder,
   updateOrderToPaid,
   getCheckoutSession,
   chargeTest,
} from '../controller/orderController.js';

router.use(protect);
router.route('/').post(createOrder);

router.route('/:id').get(getOrder).patch(updateOrderToPaid);

router.get('/checkout-session/:orderId', getCheckoutSession);

router.post('/charge', chargeTest);

export default router;
