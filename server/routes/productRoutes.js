import express from 'express';
const router = express.Router();
import reviewRouter from './reviewRoutes.js';
import {getAllProducts, createProduct, getProduct} from '../controller/productController.js';

router.use('/:productId/reviews', reviewRouter);

router.route('/')
           .get(getAllProducts)
           .post(createProduct)

router.route('/:id')
           .get(getProduct)           

export default router;           