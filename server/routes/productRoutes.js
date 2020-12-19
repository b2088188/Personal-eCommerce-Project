import express from 'express';
const router = express.Router();
import {getAllProducts, createProduct, getProduct} from '../controller/productController.js';

router.route('/')
           .get(getAllProducts)
           .post(createProduct)

router.route('/:id')
           .get(getProduct)           

export default router;           