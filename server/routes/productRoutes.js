import express from 'express';
const router = express.Router();
import reviewRouter from './reviewRoutes.js';
import { protect, restrictTo } from '../controller/authController.js';
import {
   getAllProducts,
   getUserProducts,
   createProduct,
   getProduct,
   uploadProductImage,
   resizeProductImage
} from '../controller/productController.js';

router.use('/:productId/reviews', reviewRouter);

router.route('/').get(getAllProducts);
router.route('/:id').get(getProduct);

router.use(protect, restrictTo('user'));
router.route('/').post(uploadProductImage, resizeProductImage, createProduct).get(getUserProducts);

export default router;
