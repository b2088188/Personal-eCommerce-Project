import express from 'express';
const router = express.Router();
import reviewRouter from './reviewRoutes.js';
import { protect, restrictTo } from '../controller/authController.js';
import {
   getAllProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
   uploadProductImage,
   resizeProductImage
} from '../controller/productController.js';

router.use('/:productId/reviews', reviewRouter);

router.route('/').get(getAllProducts);
router
   .route('/:productId')
   .get(getProduct)
   .patch(protect, restrictTo('admin'), uploadProductImage, resizeProductImage, updateProduct)
   .delete(protect, restrictTo('admin'), deleteProduct);

router.use(protect, restrictTo('admin'));
router.route('/').post(uploadProductImage, resizeProductImage, createProduct);

export default router;
